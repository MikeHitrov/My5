const graphql = require("graphql");
const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} = graphql;
const db = require("../db");
const {buildQuery} = require('../utils');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    identifier: {type: GraphQLString},
    PIN: {type: GraphQLInt},
    firstName: {type: GraphQLString},
    midName: {type: GraphQLString},
    lastName: {type: GraphQLString},
    type: {type: GraphQLString},
    class: {type: GraphQLString},
    status: {type: GraphQLInt}
  })
});

const UserFields = {
  user: {
    type: UserType,
    args: {
      identifier: {type: GraphQLString}
    },
    resolve: (parent, args) => {
      return new Promise(resolve => {
        db.query(...buildQuery('users', '*', args), (err, res) => {
          if (err) throw err;
          resolve(res[0]);
        });
      });
    }
  },
  users: {
    type: new GraphQLList(UserType),
    args: {
      identifier: {type: GraphQLString},
      PIN: {type: GraphQLInt},
      firstName: {type: GraphQLString},
      midName: {type: GraphQLString},
      lastName: {type: GraphQLString},
      type: {type: GraphQLString},
      class: {type: GraphQLString},
      status: {type: GraphQLInt}
    },
    resolve: (parent, args) => {
      return new Promise(resolve => {
        db.query(...buildQuery('users', '*', args), (err, res) => {
          if (err) throw err;
          resolve(res);
        });
      });
    }
  }
};

module.exports = {UserType, UserFields};
