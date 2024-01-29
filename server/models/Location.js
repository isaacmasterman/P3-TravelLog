const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    latitude: {
        type: Number,
        min: -90,  // Minimum value for latitude
        max: 90    // Maximum value for latitude
    },
    longitude: {
        type: Number,
        min: -180, // Minimum value for longitude
        max: 180   // Maximum value for longitude
    },
    rating: {
        type: Number,
        min: 0,    
        max: 5     
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;