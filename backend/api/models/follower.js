const mongoose = require('mongoose');

const followerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    questionid: String,
    follower:String
  });

module.exports = mongoose.model('Follower', followerSchema);