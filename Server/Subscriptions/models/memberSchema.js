const mongoose = require('mongoose')

let memberSchema = mongoose.Schema;

let Member = new memberSchema({
    name: String,
    email: String,
    city: String
})

module.exports = mongoose.model('members', Member)

