const mongoose = require('mongoose');

const userfollowSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userid: String, // mongodb id of user
    followerid:String, //the mongodb id of followers
    
   });

module.exports = mongoose.model('Userfollow', userfollowSchema);