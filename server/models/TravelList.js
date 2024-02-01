const mongoose = require('mongoose');

const travelListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const TravelList = mongoose.model('List', travelListSchema);

module.exports = TravelList;