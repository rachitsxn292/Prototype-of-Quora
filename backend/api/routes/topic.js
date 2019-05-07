const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Topic = require('../models/topic');
var multer = require('multer');
const path = require("path");
const Topicfollower = require('../models/topicfollower');
const fs = require('fs');

router.get('/', (req, res, next) => {
    kafka.make_request("quora", {"type":"topics/get",req:req}, function (err, result) {
        if (err) {       
            res.status(500).json({
                error: err
            })
        }
        else {
            res.status(200).json(result);
        }
    });
});



const storage = multer.diskStorage({
    destination: "../frontend/public/uploads/topic",
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 999999999999999999999999 },
}).single("myImage");

router.post('/', (req, res, next) => {
    kafka.make_request("quora", {"type":"topics/post",req:req}, function (err, result) {

    if (err) {       
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end("Topic Created");
    }
    else {
        res.status(200).json(result);
    }
});

});



//follow a topic
router.post('/follow', (req, res, next) => {
    kafka.make_request("quora", {"type":"topics/follow",req:req}, function (err, result) {

        if (err) {       
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("Topic Created");
        }
        else {
            res.status(200).json(result);
        }
    });
    });


//check if a topic is followed
    
    router.get('/isfollowed', (req, res, next) => {
        kafka.make_request("quora", {"type":"topics/isfollowed",req:req}, function (err, result) {

            if (err) {       
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end("Topic Created");
            }
            else {
                res.status(200).json(result);
            }
        });
        });

module.exports = router;