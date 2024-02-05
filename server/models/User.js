const {Schema, model } = require('mongoose');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true,
        unique: true
    },
    email: { 
        type: String, 
        required: true,
        unique: true,
        // Basic regex for email validation
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: { 
        type: String, 
        required: true
    },
    lists: [
        {
            type: Schema.Types.ObjectId,
            ref: 'List'
        }
    ],
}, 
{ timestamps: true }); // This adds createdAt and updatedAt fields


userSchema.pre('save', function(next) {
    let user = this;

    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // Hash the password
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) return next(err);

        // Override the plaintext password with the hashed one
        user.password = hash;
        next();
    });
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

const User = mongoose.model('User', userSchema);

module.exports = User;