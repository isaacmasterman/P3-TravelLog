const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    listTitle: {
        type: String,
        required: true,
        trim: true
    },
    listDescription: {
        type: String,
        trim: true
    },
    owner: {
        type: String,
        trim: true,
        required: true
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
            // summary: {
            //     type: String,
            // },
            // photos: [
            //     {
            //         url: String,
            //         description: String
            //     }
            // ],
            // address: {
            //     type: String,
            // }
        }
    ]
});


const List = mongoose.model('List', ListSchema);

module.exports = List;