const mongoose = require("mongoose");

// i will add in image uploading capabilities eventually
const requestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Requested'
    },
    requester: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    requesterUsername: {
        type: String,
        lowercase: true,
        required: true
    },
    requestee: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    requesteeUsername: {
        type: String,
        lowercase: true,
        required: true
    }},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Request', requestSchema);
