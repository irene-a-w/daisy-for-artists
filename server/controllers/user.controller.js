const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.js') ;


const createUser = asyncHandler(async (req, res) => {
    const newUsername = req.body.username;
    const newEmail = req.body.email;
    const newPassword = req.body.password;

    const emailInUse = await User.findOne({ email: newEmail }).exec();
    const usernameInUse = await User.findOne({ username: newUsername }).exec();
    if (emailInUse) {
        return res.status(403).json({ message: 'email exists' });
    }
    if (usernameInUse) {
        return res.status(403).json({ message: 'username exists' });
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    // create user
    const newUser = new User({
        username: newUsername,
        email: newEmail,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.status(200).json({
            username: newUsername,
            email: newEmail,
            password: newPassword,
            token: generateToken(newUser._id)
        });
    }
    catch(error) {
        res.status(500).json({ message: error.message });
    }
    
});

const loginUser = asyncHandler(async (req, res) => {
    const existingUsername = req.body.username;
    const existingPassword = req.body.password;

    const findUser = await User.findOne({ username: existingUsername }).exec();

    if (findUser && await bcrypt.compare(existingPassword, findUser.password)) {
        res.json({
            username: existingUsername,
            password: existingPassword,
            token: generateToken(findUser._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
});

const getUserInfoById = asyncHandler(async (req, res) => {
    const { _id, username, email, password } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        username,
        email,
        password
    })
});

const changeUsername = asyncHandler(async (req, res) => {
    const choosenUsername = req.body.username;

    // check that the choosen username isn't already in use
    const findUser = await User.findOne({ username: choosenUsername }).exec();
    
    if (findUser) {
        return res.status(200).json({ message: 'Choose a diff username' });
    }
    const updateUsername = await User.findByIdAndUpdate(req.params.id, {
        username: req.body.username
      });
    res.status(200).json(updateUsername);
    res.send(updateUsername);
});

const changePassword = asyncHandler(async (req, res) => {
    const updateUserPassword = await User.findByIdAndUpdate(req.params.id, {
        password: req.body.password
      });
    res.status(200).json(updateUserPassword);
    res.send(updateUserPassword);
});

// generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    createUser,
    loginUser,
    getUserInfoById,
    changeUsername,
    changePassword
}