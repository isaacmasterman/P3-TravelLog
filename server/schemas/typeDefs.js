const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String
        lists: [List]
    }

    type List {
        _id: ID!
        listTitle: String!
        listDescription: String
        user: User
        owner: String
        locations: [Location]
    }

    type Location {
        _id: ID!
        locationName: String!
        locationDescription: String
        locationRating: Int
    }


    type AuthPayload {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(username: String!): User
        lists(username: String): [List]
        list(listId: ID!): List
        me: User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): AuthPayload
        deleteUser(_id: ID!): User
        login(email: String!, password: String!): AuthPayload

        createList(listTitle: String!, listDescription: String): List
        deleteList(listId: ID!): List

        addLocation(listId: ID!, locationName: String!, locationDescription: String, locationRating: Int): List
        deleteLocation(listId: ID!, locationId: ID!): List


    
    }
`;

module.exports = typeDefs;
