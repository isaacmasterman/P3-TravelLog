const mongoose = require('mongoose');

const travelListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    tags: {
        type: [String],
        enum: ['Favourites', 'Want to go', 'Have been']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const TravelList = mongoose.model('TravelList', travelListSchema);

module.exports = TravelList;