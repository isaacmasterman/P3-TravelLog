const { User, List } = require('../models/index');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async (parent, args, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            return await User.find({}).populate('lists');
        },
        user: async (parent, { userId }, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            return await User.findById(userId).populate('lists');
        },
        lists: async () => {
            return await List.find({});
        },
        list: async (parent, { listId }) => {
            return await List.findById(listId);
        },
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id }).populate('lists');
            }
            throw AuthenticationError;
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

            const token = signToken( user );
            return { token, user };
        },
        updateUser: async (parent, { username, email, password }, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            let update = {};
            if (username) update.username = username;
            if (email) update.email = email;
            if (newPassword) {
                // Hash the new password before storing it
                const saltRounds = 10; // Adjust salt rounds as needed
                const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
                update.password = hashedPassword;
            }
            const userId = context.user.id;

            // Update the user in the database
            const updatedUser = await User.findByIdAndUpdate(userId, update, { new: true });

            if (!updatedUser) {
                throw new Error('User not found');
            }

            return updatedUser;
        },
        deleteUser: async (parent, { userId }, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            return await User.findByIdAndDelete(userId);
        },
        addLocation: async (parent, { listId, locationName }, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            if (rating < 0 || rating > 5) {
                throw new Error("Rating must be between 0 and 5");
            }
            return List.findOneAndUpdate(
                {listId},
                {
                    $addToSet: {
                        locations: { locationName, locationDescription, locationRating }
                    }
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        },
        deleteLocation: async (parent, { listId, locationId }, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            return List.findOneAndUpdate(
                { _id: listId },
                {
                  $pull: {
                    locations: {
                      _id: locationId,
                    },
                  },
                },
                { new: true }
            );
        },
        createList: async (parent, { title, description }, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            const list = List.create({ title, description });
            await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { lists: list._id } }
            );
            return list;  
        },
        deleteList: async (parent, { listId }, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            const list = List.findOneAndDelete({_id: listId})
            await User.findOneAndUpdate(
                { _id: context.user._id },
                {$pull: {lists: list._id}}
            )
            return list
        },
    },
};

module.exports = resolvers;
