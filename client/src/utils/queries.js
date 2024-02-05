import { gql } from '@apollo/client';

export const GET_USERS = gql`
    query {
        users {
            userId
            username
            email
            lists {
                listId
                listTitle
                listDescription
                locations {
                    locationId
                    locationName
                    locationDescription
                    locationRating
                }
            }
        }
    }
`;

export const GET_USER = gql`
    query getUser($userId: ID!) {
        user(userId: $userId) {
            userId
            username
            email
            lists {
                listId
                listTitle
                listDescription
                locations {
                    locationId
                    locationName
                    locationDescription
                    locationRating
                }
            }
        }
    }
`;

export const GET_LISTS = gql`
    query {
        lists {
            listId
            listTitle
            listDescription
            user {
                userId
                username
            }
            locations {
                locationId
                locationName
                locationDescription
                locationRating
            }
        }
    }
`;

export const GET_LIST = gql`
    query getList($listId: ID!) {
        list(listId: $listId) {
            listId
            listTitle
            listDescription
            user {
                userId
                username
            }
            locations {
                locationId
                locationName
                locationDescription
                locationRating
            }
        }
    }
`;

export const GET_ME = gql`
    query {
        me {
            userId
            username
            email
            lists {
                listId
                listTitle
                listDescription
                locations {
                    locationId
                    locationName
                    locationDescription
                    locationRating
                }
            }
        }
    }
`;

