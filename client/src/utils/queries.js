import { gql } from '@apollo/client';

export const GET_USERS = gql`
    query {
        users {
            _id
            username
            email
            lists {
                _id
                listTitle
                listDescription
                locations {
                    _id
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
            _id
            username
            email
            lists {
                _id
                listTitle
                listDescription
                locations {
                    _id
                    locationName
                    locationDescription
                    locationRating
                }
            }
        }
    }
`;

export const GET_LISTS = gql`
    query getlists{
        lists {
            _id
            listTitle
            listDescription
            user {
                _id
                username
            }
            locations {
                _id
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
            _id
            listTitle
            listDescription
            user {
                _id
                username
            }
            locations {
                _id
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
            _id
            username
            email
            lists {
                _id
                listTitle
                listDescription
                locations {
                    _id
                    locationName
                    locationDescription
                    locationRating
                }
            }
        }
    }
`;

