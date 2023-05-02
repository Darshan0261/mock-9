const express = require('express');

const { PostModel } = require('../models/Post.model');
const { authentication } = require('../middlewares/authorization');
const { UserModel } = require('../models/User.model');

const postsRouter = express.Router();

postsRouter.get('/', async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.send(posts);
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

postsRouter.post('/', authentication, async (req, res) => {
    const { userData, text, image } = req.body;
    try {
        const payload = {
            user: userData.id,
            text, image,
            createdAt: new Date()
        }
        const post = new PostModel(payload);
        await post.save();
        const user = await UserModel.findOne({_id: userData.id});
        user.posts.push(post._id)
        await user.save()
        return res.status(201).send({ message: 'New Post posted Sucessfully' });
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

postsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await PostModel.findOne({ _id: id });
        if (!post) {
            return res.status(404).send({ message: 'Post Not Found' });
        }
        return res.send(post)
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

postsRouter.patch('/:id', authentication, async (req, res) => {
    const { id } = req.params;
    const { userData } = req.body;
    const payload = req.body;
    try {
        const post = await PostModel.findOne({ _id: id });
        if (!post) {
            return res.status(404).send({ message: 'Post Not Found' });
        }
        if (post.user != userData.id) {
            return res.status(401).send({ message: 'Access Denied' });
        }
        await PostModel.findOneAndUpdate({ _id: id }, payload);
        return res.status(204).send({ message: 'Post Updated Sucessfully' });
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

postsRouter.delete('/:id', authentication, async (req, res) => {
    const { id } = req.params;
    const { userData } = req.body;
    try {
        const post = await PostModel.findOne({ _id: id });
        if (!post) {
            return res.status(404).send({ message: 'Post Not Found' });
        }
        if (post.user != userData.id) {
            return res.status(401).send({ message: 'Access Denied' });
        }
        await PostModel.findByIdAndDelete({ _id: id });
        return res.status(202).send({ message: 'Post Deleted Sucessfully' });
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

postsRouter.post('/:id/like', authentication, async (req, res) => {
    const { id } = req.params;
    const { userData } = req.body;
    try {
        const post = await PostModel.findOne({ _id: id });
        if (!post) {
            return res.status(404).send({ message: 'Post Not Found' });
        }
        if (post.likes.some(ele => {
            return ele == userData.id;
        })) {
            return res.status(409).send({ message: 'Post Liked Already' });
        }
        post.likes.push(userData.id);
        await post.save();
        return res.status(201).send({ message: 'Post Liked' })
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

postsRouter.post('/:id/comment', authentication, async (req, res) => {
    const { id } = req.params;
    const { userData } = req.body;
    const { text } = req.body;
    if (!text) {
        return res.status(400).send({ message: 'Comment text Required' })
    }
    try {
        const post = await PostModel.findOne({ _id: id });
        if (!post) {
            return res.status(404).send({ message: 'Post Not Found' });
        }
        const comment = {
            user: userData.id,
            text, createdAt: new Date()
        }
        post.comments.push(comment);
        await post.save();
        return res.status(201).send({ message: 'Comment Sucessfully Posted' })
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

module.exports = {
    postsRouter
}