import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                email
            }
        }
    }
`;


export const DELETE_USER = gql`
    mutation deleteUser($userId: ID!) {
        deleteUser(userId: $userId) {
            _id
        }
    }
`;

export const ADD_LOCATION = gql`
    mutation addLocation($listId: ID!, $locationName: String!, $locationDescription: String, $locationRating: Int) {
        addLocation(listId: $listId, locationName: $locationName, locationDescription: $locationDescription, locationRating: $locationRating) {
            _id
            locations {
                _id
                locationName
                locationDescription
                locationRating
            }
        }
    }
`;

export const DELETE_LOCATION = gql`
    mutation deleteLocation($listId: ID!, $locationId: ID!) {
        deleteLocation(listId: $listId, locationId: $locationId) {
            _id
            locations {
                _id
            }
        }
    }
`;

export const CREATE_LIST = gql`
    mutation createList($listTitle: String!, $listDescription: String) {
        createList(listTitle: $listTitle, listDescription: $listDescription) {
            _id
            listTitle
            listDescription
        }
    }
`;

export const DELETE_LIST = gql`
    mutation deleteList($listId: ID!) {
        deleteList(listId: $listId) {
            listId
        }
    }
`;

