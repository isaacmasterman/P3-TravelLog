const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://isaacmasterman:13Robinln@cluster0.jeq224s.mongodb.net/?retryWrites=true&w=majority');

module.exports = mongoose.connection;
