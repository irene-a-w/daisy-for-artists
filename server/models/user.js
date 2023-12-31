const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // avatar: {
    //     type: String,
    //     required: true
    // },
    allRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request'
    }]
});

module.exports = mongoose.model('User', UserSchema);
