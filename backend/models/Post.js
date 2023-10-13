const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let postSchema = new Schema({
    title: {
      type: String
    },
    content: {
      type: String
    },
    author: {
      type: String
    }, 
    date: {
      type: Date
    }
},{
    collection: 'posts'
})

module.exports = mongoose.model('Post', postSchema)