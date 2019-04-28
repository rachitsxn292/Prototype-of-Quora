const mongoose = require('mongoose');
const Comments = require('./comments');

const answerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    questionID: String,
    answer: String,
    owner: {
        type: String,
        required: true
    },
    image: String,
    isAnonymous: Boolean,
    upVote: Number,
    downVote: Number,
    posted: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Answers', answerSchema);