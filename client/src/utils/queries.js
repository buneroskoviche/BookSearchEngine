import { gql } from '@apollo/client';

export const GET_ME = gql`
    query getMe($id: ID!) {
        me(id: $id) {
            username
            email
            bookCount
            savedBooks {
                bookId
                title
                description
                authors
                image
                link
            }
        }
    }
`;