const mongoose = require('mongoose')
const  User= require('./user.model')

// Schema here defines the structure of the document
// A model that describes the structure of the post database

const postsSchema = new mongoose.Schema({
    // A single post on the POST IT app
  post: { 
    type: String,
    required: true 
},

// a reference to the user making a single post
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: User, 
    required: true, 
},
}, {timestamps: true}
);

const Posts= mongoose.model('posts', postsSchema);
module.exports = Posts;