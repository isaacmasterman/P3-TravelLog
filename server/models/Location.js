const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
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