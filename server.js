import chokidar from 'chokidar';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { clean } from 'require-clean';
import { exec } from 'child_process';
import mongoose from 'mongoose';

const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  require('dotenv').load();
}

mongoose.Promise = global.Promise;

const config = require('./config')[env];

const APP_PORT = config.appPort;
const GRAPHQL_PORT = config.graphqlPort;

let graphQLServer;
let appServer;

function startAppServer(callback) {
  // Serve the Relay app
  const compiler = webpack({
    entry: path.resolve(__dirname, 'js', 'main.js'),
    module: {
      loaders: [
        {
          exclude: /node_modules/,
          loader: 'babel',
          test: /\.js$/,
          query: {
            presets: ['es2015', 'react', 'stage-0'],
          },
        },
      ],
    },
    output: {
      filename: 'js/bundle.js',
      path: path.resolve(__dirname, 'public/'),
    },
  });
  appServer = new WebpackDevServer(compiler, {
    contentBase: '/public/',
    hot: true,
    proxy: { '/graphql': { target: `http://localhost:${GRAPHQL_PORT}` } },
    publicPath: '/js/',
    stats: { colors: true },
  });
  // Serve static resources
  appServer.use('/', express.static(path.resolve(__dirname, 'public')));
  appServer.listen(APP_PORT, () => {
    console.log(`App is now running on http://localhost:${APP_PORT}`);
    if (callback) {
      callback();
    }
  });
}

function startGraphQLServer(callback) {
  // Expose a GraphQL endpoint
  clean('./data/schema');
  const { Schema } = require('./data/schema');
  const graphQLApp = express();
  graphQLApp.use('/', graphQLHTTP({
    graphiql: true,
    pretty: true,
    schema: Schema,
  }));
  graphQLServer = graphQLApp.listen(GRAPHQL_PORT, () => {
    console.log(`GraphQL server is now running on http://localhost:${GRAPHQL_PORT}`);
    if (callback) {
      callback();
    }
  });
}

function openDatabaseConnection() {
  mongoose.connect(config.database, (err) => {
    if (err) {
      console.log('Error when connecting:', err);
    } else {
      console.log('Server connected to the database.');
    }
  });
}

function startServers(callback) {
  // Shut down the servers
  if (appServer) {
    appServer.listeningApp.close();
  }
  if (graphQLServer) {
    graphQLServer.close();
  }

  // Compile the schema
  exec('npm run update-schema', (error, stdout) => {
    console.log(stdout);
    let doneTasks = 0;
    function handleTaskDone() {
      doneTasks += 1;
      if (doneTasks === 2 && callback) {
        callback();
      }
    }
    openDatabaseConnection();
    startGraphQLServer(handleTaskDone);
    startAppServer(handleTaskDone);
  });
}
const watcher = chokidar.watch('./data/{database,schema}.js');
watcher.on('change', path => {
  console.log(`\`${path}\` changed. Restarting.`);
  startServers(() =>
    console.log('Restart your browser to use the updated schema.')
  );
});
startServers();
