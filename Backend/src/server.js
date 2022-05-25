require('./models/db');
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./graphql/schema')
const graphqlResolvers = require('./graphql/resolvers')

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: true,
}));

module.exports = app
