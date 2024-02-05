const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        lists: [List]
    }

    type List {
        _id: ID!
        user: User!
        listTitle: String!
        listDescription: String
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
        lists: [List]
        list(listId: ID!): List
        me: User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): AuthPayload
        deleteUser(_id: ID!): User
        login(email: String!, password: String!): AuthPayload

        addLocation(name: String!, description: String, rating: Int): List
        deleteLocation(listId: ID!, commentId: ID!): List

        createList(listTitle: String!, listDescription: String): List
        deleteList(listId: ID!): List
    
    }
`;

module.exports = typeDefs;
