const { Book, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { _id }) => {
            return User.findById(_id).populate('savedBooks')
        },
        users: async () => {
            return User.find().populate('savedBooks')
        }
    },

    Mutation: {
        addUser: async (_parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (_parent, {email, password}) => {
            const user = await User.findOne({email});
            if(!user) {
                throw new AuthenticationError('Could not find that user.');
            }
            const passCheck = await user.isCorrectPassword(password);
            if(!passCheck) {
                throw new AuthenticationError('Email or password incorrect.');
            }
            const token = signToken(user);
            return {token, user};
        }
    }
}

module.exports = resolvers;