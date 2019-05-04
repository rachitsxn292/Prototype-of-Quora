const mongoose = require('mongoose');

const bookmarksSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    questionID: String,
    answerID: String,
    owner: String,
    answer: String
});

module.exports = mongoose.model('Bookmarks', bookmarksSchema);