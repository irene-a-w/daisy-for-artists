const express = require('express');
const router = express.Router();

const {
    createUser,
    loginUser,
    getUserInfoById,
    changeUsername,
    changePassword
  } = require('../controllers/user.controller.js');
const { protect } = require('../middleware/authMiddleware.js');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route('/').post(createUser);
router.route('/login').post(loginUser);
router.route('/:id').get(protect, getUserInfoById);
router.route('/:id').patch(protect, changeUsername);
router.route('/:id').patch(protect, changePassword);

module.exports = router;