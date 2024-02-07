const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mern-shopping';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  module.exports = mongoose.connection;
