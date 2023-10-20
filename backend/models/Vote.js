const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let voteSchema = new Schema({
    author: {
      type: String
    },
    vote: {
      type: Boolean
    },
    date: {
      type: Date
    },
    targetID: {
      type: String
    }
},{
    collection: 'votes'
})

module.exports = mongoose.model('Vote', voteSchema)