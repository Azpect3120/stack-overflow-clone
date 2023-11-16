const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let commentSchema = new Schema({
    author: {
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
    postID: {
      type: String
    }
},{
    collection: 'comments',
    timestamps: true
})

module.exports = mongoose.model('Comment', commentSchema)