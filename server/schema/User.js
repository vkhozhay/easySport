const {GraphQLObjectType, GraphQLID, GraphQLString} = require('graphql');
const bcript = require('bcryptjs')
const User = require('../models/User');

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        // id: {type: GraphQLID},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
    })
})


const userQueryFields = {
    user: {
        type: UserType,
        args: {email: {type: GraphQLString}},
        resolve(parent, args) {
            return User.findOne({email: parent.email});
        }
    }
}

const userMutationFields = {
    createUser: {
        type: UserType,
        args: {
            firstName: {type: GraphQLString},
            lastName: {type: GraphQLString},
            username: {type: GraphQLString},
            email: {type: GraphQLString},
            password: {type: GraphQLString},
        },
        async resolve(parent, args) {
            const password = await bcript.hash(args.password, 12);
            const user = new User({
                firstName: args.firstName,
                lastName: args.lastName,
                username: args.username,
                email: args.email,
                password
            })
           return user.save();
        }
    }
}

module.exports = {userQueryFields, userMutationFields};