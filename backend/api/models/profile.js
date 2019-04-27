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
    companyname:String,
    companyposition:String,
    companystart:String,
    companyend:String,
    career:String,
    hometown:String,
    languages:String,
    gender:String,
    profilecredential:String,
    educationschool :String,
    educationstart:String,
    educationend:String,
    educationdegree:String
    
    
   });

module.exports = mongoose.model('Profile', profileSchema);