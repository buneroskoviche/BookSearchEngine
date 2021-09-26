const { Book, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (req, {id}) => {
            try {
                return User.findOne({_id: id}).populate('savedBooks')
            } catch (e) {
                console.log(e)
            }
        },
        users: async () => {
            try {
                return User.find().populate('savedBooks')
            } catch (e) {
                console.log(e)
            }
        }
    },

    Mutation: {
        addUser: async (_parent, args) => {
            try {
                const user = await User.create(args);
                const token = signToken(user);
                return { token, user };
            } catch (e) {;
                console.log(e);
            }
        },
        login: async (_parent, {email, password}) => {
            try {
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
            } catch (e) {
                console.log(e);
            }
            
        },
        saveBook: async (_, {id, input}) => {
            try {
                return User.findOneAndUpdate(
                    {_id: id},
                    { $addToSet: { savedBooks: input }},
                    { new: true, runValidators: true},
                );
            } catch (e) {
                console.log(e);
            }
        },
        deleteBook: async(req, {id, bookId}) => {
            try {
                return User.findOneAndUpdate(
                    {_id: id},
                    { $pull: { savedBooks: {bookId: bookId} }},
                    { new: true},
                );
            } catch (e) {
                console.log(e);
            }
        }
    }
}

module.exports = resolvers;