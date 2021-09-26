import { gql } from '@apollo/client';

export const GET_ME = gql`
    query getUser($userId: ID!) {
        user(userId: $userId) {
            _id
            username
            email
            bookCount
            savedBooks
        }
    }
`;