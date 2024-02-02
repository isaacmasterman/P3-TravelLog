const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    locations:[
        {
            name: {
                type: String,
                required: true
            },
            description: {
                type: String
            },
            rating: {
                type: Number,
                min:0,
                max: 5
            },
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const List = mongoose.model('List', ListSchema);

module.exports = List;