const { GraphQLObjectType, GraphQLSchema, GraphQLString} = require('graphql');
const {userQueryFields,userMutationFields} = require('./User.js');

const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        ...userQueryFields
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        ...userMutationFields
    }
})

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})