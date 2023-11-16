const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let postSchema = new Schema({
    author: {
      type: String
    }, 
    title: {
      type: String
    },
    content: {
      type: String
    },
    votes: {
      type: Array
    },
    voteCount: {
      type: Number
    },
    date: {
      type: Date
    },
    imageUrl: {
      type: String
    }
},{
    collection: 'posts',
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema)