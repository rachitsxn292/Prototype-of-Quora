const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
const Profile = require('../models/profile');
var kafka = require('../kafka/client');
const fs = require('fs');
const Topicfollower = require('../models/topicfollower');
const Topic = require('../models/topic');
const Question = require('../models/question');
const Answers = require('../models/answers');
const Comments = require('../models/comments');
const Votes = require('../models/votes');
const Bookmarks = require('../models/bookmarks');
const Notifications = require('../models/notifications');
const Followers = require('../models/follower');
var multer = require('multer');
const path = require("path");
const Messages = require('../models/messages');

mongoose.connect('mongodb+srv://root:' +
process.env.MONGO_PASSWORD+ 
'@cluster0-kgps1.mongodb.net/quora?retryWrites=true',
{
    useNewUrlParser: true
}
);

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

mongoose.set('useCreateIndex', true)

function handle_request(message, callback) {

    var req = message;

    switch (message.type) {
        case 'test':
        try {
            console.log("In the test", message.type);
            callback(null, { result: "Success" });
        }
        catch (err) {
            console.log(err);
        }
        break;

        case 'topics/get':
        try {
            Topic.find()
            .exec()
            .then(docs => {
                console.log(docs);
                fs.appendFile('logs.txt', 'Status 200, Topics Returned  '+Date.now()+'\n', function (err) {
                    if (err) throw err;
                    console.log('Updated!');
                  });
                  callback(null, docs);
                })
            .catch(err => {
                callback(null, err);

            })
        }
        catch (err) {
            console.log(err);
        }
        break;

        case 'topics/post':
        try {
            upload(req, res, (err) => {
                const param = req.body.param;
                var picName = "";
                if(req.file == null || req.file.originalname == null || req.file.originalname == "")
                {
                    picName = "default.jpg"; //if no pic was uploaded display default
                }
                else
                {
                    var picName = req.file.originalname;
                    var filepath = req.file;   
                    var filepath = filepath.filename;
                }
                var data =  { topic: param, picture: picName};
                var query = { topic: param },
                    options = { upsert: true, new: true, setDefaultsOnInsert: true };
        
                //console.log("Request file ---", JSON.stringify(req.file));  //Here you get file.
              
                // //first you wanna check if topic exists, then create else update
                Topic.findOneAndUpdate(query,    {  $set : data}, options, function (error, result) {
                        console.log("resiult", error)
                   console.log("inside");
                   fs.appendFile('logs.txt', 'Status 200, Topics Created  '+Date.now()+'\n', function (err) {
                    if (err) throw err;
                    console.log('Updated!');
                  });
                  callback(null, { result: "Success" });

                });
        
            }); //upload end
        }
        catch (err) {
            callback(null, { result: err });
        }
        break;

        case 'topics/follow':
        try {
            const param = req.body.topic;
            const follower = req.body.follower;
            var object = new Topicfollower({ _id: new mongoose.Types.ObjectId(), topic: param, follower: follower });
            object
                .save()
                .then(result => {
                    console.log(result);
                }).catch(err => console.log(err));
                fs.appendFile('logs.txt', 'Status 200, Topics Followed  '+Date.now()+'\n', function (err) {
                    if (err) throw err;
                    console.log('Updated!');
                  });
                  callback(null, { result: "Success" });

        }
        catch (err) {
            callback(null, { result: err });
        }
        break;

        case 'topics/isfollowed':
        try {
            var topic = req.query.topic;
            var follower = req.query.follower;
            Topicfollower.find({topic:topic, follower: follower})
            .exec()
            .then(docs => {
        
                callback(null, docs);
            })
            .catch(err => {
                callback(null, { result: err });

            })
        }
        catch (err) {
            console.log(err);
        }
        break;

    }
                
    //callback(null, { loadbalancer:"Tested" });

   
}

exports.handle_request = handle_request;