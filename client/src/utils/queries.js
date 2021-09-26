import { gql } from '@apollo/client';

export const GET_ME = gql`
    query getUser($userId: ID!) {
        user(userId: $userId) {
            _id: String
            username: String
            email: String
            bookCount: Int
            savedBooks: [Book]
        }
    }
`;