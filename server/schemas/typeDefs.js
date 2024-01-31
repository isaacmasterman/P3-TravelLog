const typeDefs = `
    type User {
        userId: ID!
        username: String!
        email: String!
        locations: [ListLocation]
    }
  
    type Location {
        locationId: ID!
        name: String!
        description: String
        rating: Int
    }
  
    type TravelList {
        listId: ID!
        user: User!
        title: String!
        description: String
        locations: [Location]
    }
    
    type ListLocation {
        travelList: TravelList!
        location: Location!
        comments: String
        datePlanned: String
    }
    
    type Query {
        users: [User]
        user(userId: ID!): User
        locations: [Location]
        location(locationId: ID!): Location
        travelLists: [TravelList]
        travelList(listId: ID!): TravelList
        listLocations: [ListLocation]
        listLocation(listId: ID!, locationId: ID!): ListLocation
    }
      
    type Mutation {
        createUser(username: String!, email: String!, password: String!): User
        updateUser(userId: ID!, username: String, email: String, password: String): User
        deleteUser(userId: ID!): User
      
        createLocation(name: String!, description: String, rating: Int, addedByUserId: ID): Location
        updateLocation(locationId: ID!, name: String, description: String, rating:Int): Location
        deleteLocation(locationId: ID!): Location
      
        createTravelList(userId: ID!, title: String!, description: String): TravelList
        updateTravelList(listId: ID!, title: String, description: String): TravelList
        deleteTravelList(listId: ID!): TravelList
      
        createListLocation(listId: ID!, locationId: ID!, comments: String, datePlanned: String): ListLocation
        updateListLocation(listId: ID!, locationId: ID!, comments: String, datePlanned: String): ListLocation
        deleteListLocation(listId: ID!, locationId: ID!): ListLocation
    }
`;

module.exports = typeDefs;
