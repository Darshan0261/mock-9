const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    text: { type: String, rquired: true },
    image: String,
    createdAt: { type: Date, required: true },
    likes: { type: [{ type: mongoose.Types.ObjectId, ref: 'user', required: true }], default: [] },
    comments: {
        type: [{
            user: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
            text: { type: String, required: true },
            createdAt: { type: Date, required: true }
        }], default: []
    }
})

const PostModel = mongoose.model('post', PostSchema);

module.exports = {
    PostModel
}