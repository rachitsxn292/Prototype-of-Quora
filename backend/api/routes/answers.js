const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Answers = require('../models/answers');
const Comments = require('../models/comments');
const Questions = require('../models/question');
const Votes = require('../models/votes');
const Bookmarks = require('../models/bookmarks');
const Notifications = require('../models/notifications');
const Followers = require('../models/follower');
var multer = require('multer');
const path = require("path");
const fs = require('fs');

//to get all answers for a particular question
router.get('/', (req, res) => {
    kafka.make_request("quora", {"type":"answers/get",req:req}, function (err, result) {
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


//to get one answers for a particular question to be displayed on homepage
router.get('/one', (req, res) => {
    kafka.make_request("quora", {"type":"answers/one",req:req}, function (err, result) {
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
    destination: "../frontend/public/uploads",
    filename: function (req, file, cb) {
        cb(null, "QUORA" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 999999999999999999999999 },
}).single("myImage");

//to create a new answer for a particular question
router.post('/', (req, res) => {
kafka.make_request("quora", {"type":"answers/post",req:req}, function (err, result) {
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



//to edit an existing answer 
router.post('/edit', (req, res) => {
    kafka.make_request("quora", {"type":"answers/edit",req:req}, function (err, result) {
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


//to upvote an answer
router.post('/upvote', (req, res) => {

    kafka.make_request("quora", {"type":"answers/downvote",req:req}, function (err, result) {
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


//to downvote an answer
router.post('/downvote', (req, res) => {
    kafka.make_request("quora", {"type":"answers/post",req:req}, function (err, result) {
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


//to comment on an answer
router.post('/comment', (req, res) => {
    kafka.make_request("quora", {"type":'answers/comment/post',req:req}, function (err, result) {
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



router.get('/comment', (req, res) => {
    kafka.make_request("quora", {"type":'answers/comment/get',req:req}, function (err, result) {
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


//to get a particular answer posted by that user
router.get('/useranswer', (req, res) => {
    kafka.make_request("quora", {"type":'answers/useranswer',req:req}, function (err, result) {
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


//to get question that user answered
router.get('/question', (req, res) => {
    kafka.make_request("quora", {"type":'answers/question',req:req}, function (err, result) {
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


router.post('/bookmark', (req, res) => {
    kafka.make_request("quora", {"type":'answers/bookmark/post',req:req}, function (err, result) {
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

router.get('/bookmark', (req, res) => {
    kafka.make_request("quora", {"type":'answers/bookmark/get',req:req}, function (err, result) {
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

router.post('/views', (req, res) => {
    kafka.make_request("quora", {"type":'answers/views',req:req}, function (err, result) {
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


//get answers by user
router.get('/answered', (req, res) => {
    kafka.make_request("quora", {"type":'answers/answered',req:req}, function (err, result) {
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


router.get('/notify', (req, res) => {
    kafka.make_request("quora", {"type":'answers/notify/get',req:req}, function (err, result) {
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

router.get('/notifycount', (req, res) => {
    kafka.make_request("quora", {"type":'answers/notifyCount',req:req}, function (err, result) {
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


router.post('/notify', (req, res) => {
    kafka.make_request("quora", {"type":'answers/notify/post',req:req}, function (err, result) {
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