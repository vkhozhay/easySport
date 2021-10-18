const {buildSchema} = require('graphql');

const schema = buildSchema(`

    type User {
        id: ID
        username: String
        email: String
        password: String
        name: String
    }
    
    input UserInput {
        id: ID
        username: String!
        email: String!
        password: String!
        name: String!
    }
    
    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
    }
    
    type Mutation {
        createUser(input: UserInput): User
    }
`);

module.exports = schema;