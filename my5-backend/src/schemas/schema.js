const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema
} = graphql;

const {UserFields} = require('./User');

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...UserFields
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
