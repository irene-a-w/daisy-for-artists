const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userID:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String, 
        required: true
    },
});

module.exports = mongoose.model('Notification', notificationSchema);