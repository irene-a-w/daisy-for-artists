const Notification = require('../models/notification.js');

const createNotification = async(req, res) => {
    const newUserID = req.body.userID;
    const newUsername = req.body.username;
    const newMessage = req.body.message;

    const newNotification = new Notification({
        userID: newUserID,
        message: newMessage
    });

    try {
        await newNotification.save();
        res.status(200).json({
            newNotification
        });
    }
    catch(error) {
        res.status(500).json({ message: error.message });
        }
};

const deleteNotification = async (req, res) => {
    const currentNotification = await Notification.findById(req.params.id)
    await currentNotification.deleteOne()
    res.status(200).json({ message: "deleted successfully!!"})
};

const getAllNotificationsByUser = async (req, res) => {
    const allNotifications = await Notification.find({ userID: req.params.userid });
    res.status(200).json(allNotifications)
}

module.exports = {
    createNotification,
    deleteNotification,
    getAllNotificationsByUser
}
