// A model that describes the structure of the User database
const mongoose = require('mongoose')
const Post = require('./posts.model')

const Schema = mongoose.Schema
const userSchema = new Schema({
    firstname:{
        type: String,
        required: true,
        lowercase: true , 
        min: 10,
        max: 50,
  },
    lastname:{
        type: String,
        required: true,
        lowercase: true ,
        min: 10,
        max: 50, 
    },
    username:{
        type:String,
        required: true,
        lowercase: true , 
        unique:true,
        min: 7,
        max: 25,

    },
    email_address:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        max: 50,
        unique : true,

    },
    password:{
        type: String,
        required: true,
        lowercase: true,
    },
    posts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Post
      },
    // set the role to enum as the default is set to user.
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, {timestamps:true}
);

const user = mongoose.model('user', userSchema);
module.exports = user;