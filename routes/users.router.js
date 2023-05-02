const express = require('express');

const { UserModel } = require('../models/User.model');
const { authentication } = require('../middlewares/authorization');

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    try {
        const users = await UserModel.aggregate([{ $project: { password: 0 } }]);
        res.send(users)
    } catch (error) {
        res.status(501).send({ message: error.message })
    }
})

userRouter.get('/:id/friends', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findOne({ _id: id });
        if (!user) {
            return res.status(404).send({ message: 'User Not Found' });
        }
        let friends = user.friends;
        res.send(friends);
    } catch (error) {
        res.status(501).send({ message: error.message })
    }
})

userRouter.post('/:id/friends', authentication, async (req, res) => {
    const friendId = req.params['id'];
    const { id } = req.body.userData;
    try {
        const friend = await UserModel.findOne({ _id: friendId });
        if (!friend) {
            return res.status(404).send({ message: 'Friend Not Found' });
        }
        friend.friendRequests.push(id);
        await friend.save();
        return res.status(204).send({ message: 'Friend Request Sent' });
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

userRouter.patch('/:id/friends/:friendId', authentication, async (req, res) => {
    const { id, friendId } = req.params;
    const { userData } = req.body;
    const { status } = req.body;
    if (userData.id != id) {
        return res.status(401).send({ message: 'Access Denied' });
    }
    if (!status) {
        return res.status(400).send({ message: 'Request Change Status Required' })
    }
    try {
        const user = await UserModel.findOne({ _id: id });
        const friendRequests = user.friendRequests;
        if (!friendRequests.some(ele => {
            return ele == friendId;
        })) {
            return res.status(404).send({ message: 'Friend with id is not in Friend Request' })
        }
        let index = 0;
        user.friendRequests.forEach((ele, ind) => {
            if (ele == friendId) {
                index = ind;
            }
        })
        user.friendRequests.splice(index, 1);
        if (status == 'accept') {
            user.friends.push(friendId);
            await user.save();
            return res.status(204).send({ message: 'Friend Request Accepted' })
        } else {
            await user.save();
            return res.status(204).send({ message: 'Friend Request Rejected' })
        }
    } catch (error) {
        console.log(error)
        return res.status(501).send({ message: error.message })
    }
})

module.exports = {
    userRouter
}