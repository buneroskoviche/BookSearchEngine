const { Book, User } = require('../models');

const resolvers = {
    Query: {
        user: async (parent, { _id }) => {
            return User.findById(_id).populate('savedBooks')
        },
        users: async () => {
            return User.find().populate('savedBooks')
        }
    }
}

module.exports = resolvers;