const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    bio: String,
    posts: { type: [{ type: mongoose.Types.ObjectId, ref: 'post' }], default: [] },
    friends: { type: [{ type: mongoose.Types.ObjectId, ref: 'user' }], default: [] },
    friendRequests: { type: [{ type: mongoose.Types.ObjectId, ref: 'user' }], default: [] }
})

const UserModel = mongoose.model('user', UserSchema);

module.exports = {
    UserModel
}