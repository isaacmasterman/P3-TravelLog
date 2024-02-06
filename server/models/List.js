const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    listTitle: {
        type: String,
        required: true
    },
    listDescription: {
        type: String,
    },
    locations: [
        {
            locationName: {
                type: String,
                required: true
            },
            locationDescription: {
                type: String
            },
            locationRating: {
                type: Number,
                min: 0,
                max: 5
            },
            summary: {
                type: String,
            },
            photos: [
                {
                    url: String,
                    description: String
                }
            ],
            address: {
                type: String,
            }
        }
    ],
});


const List = mongoose.model('List', ListSchema);

module.exports = List;