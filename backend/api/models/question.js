const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    question: String,
    owner: String,
    topic:String,
    posted:{type:Date,
            default:Date.now}
    
    
   });

module.exports = mongoose.model('Question', questionSchema);