const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
      type: String
    },
    userAuthID: {
      type: String
    },
    admin: {
      type: Boolean
    }
},{
    collection: 'users',
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)