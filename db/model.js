const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, `userName can't be empty`]
    },
    userPassword: {
        type: String,
        required: [true, `password can't be empty`]
    },
    userEmail: {
        type: String,
        required: [true, `Please Enter Your Email Address`],
        unique: true
    },
    userProfile: {
        type: String,
        required: [true, `Please Set A Profile Picture`]
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date
    }
})

const imageSchema = mongoose.Schema({
    user: {
        type: String,
        required:[true,`Please provide uploader id`]
    },
    imageUrl: {
        type: String,
        required:[true,`upload a profile Photo`]
    },
    createdAt: {
        type: Date,
        required: true,
        default:new Date
    }
})


const userModel = mongoose.model("user", userSchema);
const imageModel = mongoose.model("images", imageSchema);


module.exports = { userModel, imageModel };