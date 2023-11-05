const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
      type: String
    },
    userAuthID: {
      type: String
    },
    email: {
      type: String
    },
    admin: {
      type: Boolean
    },
    avatar: {
      type: String
    },
    tags: {
      type: Array
    }
},{
    collection: 'users',
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)
