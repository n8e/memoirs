const envVariables =  {
  'database': process.env.DATABASE_URL,
  'port': process.env.PORT,
  'secretKey': process.env.SECRET_KEY,
  'appPort': process.env.PORT,
  'graphqlPort': process.env.GRAPHQL_PORT,
};

module.exports = {
  development: envVariables,
  staging: envVariables,
  production: envVariables,
  test: envVariables
};
