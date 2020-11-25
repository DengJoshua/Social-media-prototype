const mongoose = require('mongoose')
const Joi = require('joi')
const config = require('config')
const jwt = require('jsonwebtoken')
const { postSchema } = require('./post')

const notificationSchema = mongoose.Schema({
    profilePic: String,
    content: String,
    createdAt: Date
})

const messageSchema = mongoose.Schema({
    from: mongoose.SchemaTypes.ObjectId,
    message: String,
    time: String
})

const friendSchema = mongoose.Schema({
    username: String,
    status: String,
    profilePic: String,
    sentByMe: Boolean,
    inbox: [messageSchema]
})


const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 5,
        max: 100   
    },
    profile: {
        type: new mongoose.Schema({
            profilePic: {
                type: String,
            },  
             dob: {
                type: String
            },
            gender: {
                type: String
            },
            country: {
                type: String
            },
            story: String
        })
    },
    gallery: [],
    interests:[],
    friendRequests:[],
    friends: [friendSchema],
    posts: [postSchema],
    groups: [],
    recent: Object,
    notifications: [notificationSchema]
})


// generate user token
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
      {
        _id: this._id,
        username: this.username
      },
      config.get("jwtPrivateKey")
    );
    return token;
  };

function validateUser(user) {
    const schema = {
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required().min(5).max(100)
   }
    return Joi.validate(user, schema)
}

const User = mongoose.model('User', userSchema)


exports.User = User
exports.validate = validateUser;

