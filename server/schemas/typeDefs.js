const { gql } = require('apollo-server-express');

const typeDefs = gql`
    input BookInput {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Book {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }


    type User {
        _id: String
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(id: ID!, input: BookInput!): User
        deleteBook(id: ID!, bookId: String!): User
    }
`;

module.exports = typeDefs;