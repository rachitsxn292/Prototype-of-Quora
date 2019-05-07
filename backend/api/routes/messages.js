const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Messages = require('../models/messages');
const fs = require('fs');
// const User = require('./models/user');


/*router.get('/', (req, res) => {
    res.send('Reached Server');
});*/

//sending messages
 router.post('/', (req, res) => {
     kafka.make_request("quora", {"type":'messages/post',req:req}, function (err, result) {
        if (err) {       
            res.status(500).json({
                error: err
            })
        }
        else {
            res.status(200).send(result);
        }
    });
 });

 //receiving messages
router.get('/', (req, res) => {
     kafka.make_request("quora", {"type":'messages/get',req:req}, function (err, result) {
        if (err) {       
            res.status(500).json({
                error: err
            })
        }
        else {
            res.status(200).send(result);
        }
    });
})

router.get('/sent', (req, res) => {
    kafka.make_request("quora", {"type":'messages/sent',req:req}, function (err, result) {
        if (err) {       
            res.status(500).json({
                error: err
            })
        }
        else {
            res.status(200).send(result);
        }
    });
})

module.exports = router;