const { User, Location, TravelList, ListLocation } = require('../models/index');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async (parent, args, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            return await User.find({}).populate({
                path: 'travelLists',
                populate: { path: 'locations' }
            });
        },
        user: async (parent, { userId }, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            return await User.findById(userId).populate({
                path: 'travelLists',
                populate: { path: 'locations' }
            });
        },
        // ... other queries ...

        locations: async () => {
            return await Location.find({});
        },
        location: async (parent, { locationId }) => {
            return await Location.findById(locationId);
        },
        travelLists: async () => {
            return await TravelList.find({}).populate('user').populate('locations');
        },
        travelList: async (parent, { listId }) => {
            return await TravelList.findById(listId).populate('user').populate('locations');
        },
        listLocations: async () => {
            return await ListLocation.find({}).populate('travelList').populate('location');
        },
        listLocation: async (parent, { listId, locationId }) => {
            return await ListLocation.findOne({ travelList: listId, location: locationId })
                                    .populate('travelList')
                                    .populate('location');
        },
    },
    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw AuthenticationError;
            }

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw AuthenticationError;
            }

            const token = signToken({ email: user.email, username: user.username, userId: user._id });
            return { token, user };
        },
        updateUser: async (parent, { userId, username, email }, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            return await User.findByIdAndUpdate(userId, { username, email }, { new: true });
        },
        deleteUser: async (parent, { userId }, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            return await User.findByIdAndDelete(userId);
        },
        createLocation: async (parent, { name, description, rating, addedByUserId }, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            if (rating < 0 || rating > 5) {
                throw new Error("Rating must be between 0 and 5");
            }
            return await Location.create({ name, description, rating, addedByUserId });
        },
        updateLocation: async (parent, { locationId, name, description, rating }, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            if (rating < 0 || rating > 5) {
                throw new Error("Rating must be between 0 and 5");
            }
            return await Location.findByIdAndUpdate(locationId, { name, description, rating }, { new: true });
        },
        deleteLocation: async (parent, { locationId }, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            return await Location.findByIdAndDelete(locationId);
        },
        createTravelList: async (parent, { userId, title, description }, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            return await TravelList.create({ userId, title, description });
        },
        updateTravelList: async (parent, { listId, title, description }, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            return await TravelList.findByIdAndUpdate(listId, { title, description }, { new: true });
        },
        deleteTravelList: async (parent, { listId }, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            return await TravelList.findByIdAndDelete(listId);
        },
        createListLocation: async (parent, { listId, locationId, comments, datePlanned }, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            return await ListLocation.create({ listId, locationId, comments, datePlanned });
        },
        updateListLocation: async (parent, { listId, locationId, comments, datePlanned }, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            return await ListLocation.findOneAndUpdate({ listId, locationId }, { comments, datePlanned }, { new: true });
        },
        deleteListLocation: async (parent, { listId, locationId }, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            return await ListLocation.findOneAndDelete({ listId, locationId });
        },
    },
};

module.exports = resolvers;
