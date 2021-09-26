const { Book, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async ({params}, res) => {
            return User.findById(params.id).populate('savedBooks')
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
        },
        saveBook: async ({user, body}, res) => {
            try {
                return User.findOneAndUpdate(
                    {_id: user._id},
                    { $addToSet: { savedBooks: body }},
                    { new: true, runValidators: true},
                );
            } catch (e) {
                console.log(e);
            }
        },
        deleteBook: async({user, params}, res) => {
            try {
                return User.findOneAndUpdate(
                    {_id: user._id},
                    { $pull: { savedBooks: {bookId: params.bookId} }},
                    { new: true},
                );
            } catch (e) {
                console.log(e);
            }
        }
    }
}

module.exports = resolvers;