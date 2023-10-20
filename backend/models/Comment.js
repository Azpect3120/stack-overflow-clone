const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let commentSchema = new Schema({
    content: {
      type: String
    },
    author: {
      type: String
    }, 
    date: {
      type: Date
    },
    postID: {
      type: String
    }
},{
    collection: 'comments'
})

module.exports = mongoose.model('Comment', commentSchema)