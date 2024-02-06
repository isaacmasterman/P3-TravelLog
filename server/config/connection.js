const mongoose = require('mongoose');

// Replace <password>, <dbname>, and any other necessary details in your actual MongoDB Atlas connection string
const atlasUri = process.env.MONGODB_ATLAS_URI || 'mongodb+srv://isaacmasterman:13Robinln@cluster0.jeq224s.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(atlasUri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose.connection;
