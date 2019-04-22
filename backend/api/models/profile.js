const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fname: String,
    lname: String,
    email: String,
    image: String,
    mobile:String,
    about:String,
    city:String,
    country:String,
    company:{
        name:String,
        position:String,
        start:String,
        end:String
    },
    career:String,
    hometown:String,
    languages:String,
    gender:String,
    profilecredential:String,
    education :{
        school :String,
        start:String,
        end:String,
        degree:String
    }
    
   });

module.exports = mongoose.model('Profile', profileSchema);