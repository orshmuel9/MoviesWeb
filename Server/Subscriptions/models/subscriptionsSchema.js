const mongoose = require('mongoose')

let subscriptionsSchema=mongoose.Schema;
let Subscriptions= new subscriptionsSchema({
    memberId:mongoose.Types.ObjectId,
    movies:Array,//
})
module.exports = mongoose.model('subscriptions', Subscriptions)