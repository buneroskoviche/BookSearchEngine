const { Book, User } = require('../models');
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
        }
    }
}

module.exports = resolvers;