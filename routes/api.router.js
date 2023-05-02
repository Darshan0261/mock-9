const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { UserModel } = require('../models/User.model')
const { userRouter } = require('./users.router')
const { postsRouter } = require('./posts.router')

const router = express.Router();

router.use('/users', userRouter)
router.use('/posts', postsRouter)

router.post('/register', async (req, res) => {
    const { name, email, dob, password, bio } = req.body;
    if (!name || !email || !dob || !password || !bio) {
        return res.status(409).send({ message: 'Name, Email, Password, DOB and Bio Required' });
    }
    try {
        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return res.status(409).send({ message: 'Email Already Registered' })
        }
        bcrypt.hash(password, +process.env.saltRounds, async function (err, hashedPass) {
            if (err) {
                return res.status(501).send({ message: err.message })
            }
            try {
                const user = new UserModel({
                    name, email, bio, dob, password: hashedPass
                })
                await user.save();
                return res.status(201).send({ message: 'User Registered Sucessfully' });
            } catch (error) {
                return res.status(501).send({ message: error.message })
            }
        });
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ message: 'Email and Password Required' })
    }
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User Not Registered' });
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                return res.status(501).send({ message: err.message });
            }
            if (!result) {
                return res.status(401).send({ message: 'Wrong Credentials' });
            }
            const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.privateKey);
            res.status(201).send({ message: 'Login Sucessfull', token })
        });
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

module.exports = {
    router
}