import { gql } from '@apollo/client';

export const GET_ME = gql`
    query getUser($id: ID!) {
        user(userId: $id) {
            _id
            username
            email
            bookCount
            savedBooks
        }
    }
`;