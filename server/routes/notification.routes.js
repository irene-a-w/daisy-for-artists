const express = require("express");
const router = express.Router();

const { createNotification, deleteNotification, getAllNotificationsByUser } = require('../controllers/notification.controller.js');
const { protect } = require('../middleware/authMiddleware.js');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route('/create').post(protect, createNotification);
router.route('/delete/:id').delete(protect, deleteNotification);
router.route('/:userid').get(protect, getAllNotificationsByUser);

module.exports = router;