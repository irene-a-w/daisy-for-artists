const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        lowercase: true,
        required: true
    },
    bio: {
        type: String,
        default: 'test'
    }

});

module.exports = mongoose.model('Profile', profileSchema);

