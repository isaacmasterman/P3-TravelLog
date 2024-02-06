const { User, List } = require('../models/index');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('lists');
        },
        user: async (parent, { userId }, context) => {
            return User.findOne({_id: userId}).populate('lists');
        },
        lists: async (parent, { userId }) => {
            const params = userId ? { userId } : {};
            return List.find(params)
        },
        list: async (parent, { listId }) => {
            return List.findOne({_id: listId});
        },
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id }).populate('lists');
            }
            throw AuthenticationError;
          },
    },
    Mutation: {
        createUser: async (parent, {username, email, password}, context) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError;
            }

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError;
            }

            const token = signToken( user );
            return { token, user };
        },
        deleteUser: async (parent, { _id }, context) => {
            if (!context.user) {
                throw AuthenticationError;
            }
            const userToDelete = await User.findById(_id);
            if (!userToDelete) {
                throw new Error('User not found');
            }
            await User.findByIdAndDelete(_id);
            return userToDelete; // Return the user that was deleted
        },

        createList: async (parent, { listTitle, listDescription }, context) => {
            if (context.user) {
                const list = List.create({ 
                    listTitle, 
                    listDescription, 
                    owner: context.user.username
                });
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { lists: list._id } },
                    {new: true}
                );
                return list; 
            }
            throw AuthenticationError;
                
        },
        deleteList: async (parent, { listId }, context) => {
            if (context.user) {
                const list = List.findOneAndDelete({_id: listId})
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {$pull: {lists: list._id}}
                )
                return list 
            }
            throw AuthenticationError;
        },


        addLocation: async (parent, { listId, locationName, locationDescription, locationRating }, context) => {
            if (context.user) {
                if (locationRating < 0 || locationRating > 5) {
                    throw new Error("Rating must be between 0 and 5");
                }
                return List.findOneAndUpdate(
                    {_id: listId},
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
            }
            throw AuthenticationError;
            
        },
        deleteLocation: async (parent, { listId, locationId }, context) => {
            if (context.user) {
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
            }
            throw AuthenticationError;
        },


        
    },
};

module.exports = resolvers;
