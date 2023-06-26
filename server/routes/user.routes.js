const express = require('express');
const router = express.Router();

const {
    createUser,
    loginUser,
    getUserInfoById,
    changeUsername,
    changePassword,
    getUserProfile,
    changeUserProfile,
    findMatchingUsers
  } = require('../controllers/user.controller.js');
const { protect } = require('../middleware/authMiddleware.js');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route('/').post(createUser);
router.route('/login').post(loginUser);
// router.route('/:id').get(protect, getUserInfoById);
router.route('/profile/edit/username/:id').patch(protect, changeUsername);
router.route('/profile/edit/password/:id').patch(protect, changePassword);
router.route('/profile/:id').get(getUserProfile);
router.route('/profile/edit/bio/:id').get(protect, changeUserProfile);
router.route('/find').get(findMatchingUsers);

module.exports = router;