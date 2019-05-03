const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Messages = require('../models/messages');
// const User = require('./models/user');


/*router.get('/', (req, res) => {
    res.send('Reached Server');
});*/

//sending messages
 router.post('/', (req, res) => {
     const {to, from, content, date} = req.body;
     const data = new Messages({
         _id: new mongoose.Types.ObjectId(),
         to: to,
         from: from,
         content: content,
         date: new Date(),
     })
     data.save().then(result=>{
         console.log(result);
         res.status(200).json
         ({
            message:"Message sent succesfully"
        });
     }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    })
 });

 //receiving messages
router.get('/', (req, res) => {
     const {email} = req.query;
     var query = {to: email};

     Messages.find(query).exec().then(result=>{
         console.log(result);
         res.status(200).json(result);
     }).catch(err=>console.log(err));
})

router.get('/sent', (req, res) => {
    const {email} = req.query;
    var query = {from: email};

    Messages.find(query).exec().then(result=>{
        console.log(result);
        res.status(200).json(result);
    }).catch(err=>console.log(err));
})

module.exports = router;