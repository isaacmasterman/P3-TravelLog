const typeDefs = `
    type User {
        userId: ID!
        username: String!
        email: String!
        lists: [List]
    }

    type List {
        listId: ID!
        user: User!
        listTitle: String!
        listDescription: String
        locations: [Location]
    }

    type Location {
        locationId: ID!
        locationName: String!
        locationDescription: String
        locationRating: Int
    }

    type AuthPayload {
        token: String!
        user: User
    }

    type Query {
        users: [User]
        user(userId: ID!): User
        lists: [List]
        list(listId: ID!): List
        me: User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): AuthPayload
        updateUser(username: String, email: String, password: String): User
        deleteUser(userId: ID!): User
        login(email: String!, password: String!): AuthPayload

        addLocation(name: String!, description: String, rating: Int, addedByUserId: ID): List
        deleteLocation(locationId: ID!): List

        createList(userId: ID!, title: String!, description: String): List
        updateList(listId: ID!, title: String, description: String): List
        deleteList(listId: ID!): List
    
    }
`;

module.exports = typeDefs;
