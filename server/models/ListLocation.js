const mongoose = require('mongoose');

const listlocationSchema = new mongoose.Schema({
    listId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TravelList',
        required: true
    },
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    comments: String,
    datePlanned: Date
}, { timestamps: true }); // Adds createdAt and updatedAt

const ListLocation = mongoose.model('ListLocation', listlocationSchema);

module.exports = ListLocation;