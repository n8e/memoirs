var path = require('path');

module.exports = {
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
};
