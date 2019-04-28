const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Topic = require('../models/topic');
var multer = require('multer');
const path = require("path");


router.get('/', (req, res, next) => {

    Topic.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

});

router.post('/', (req, res, next) => {
    const param = req.body.param;

    //var object = new Topic({ _id: new mongoose.Types.ObjectId(), topic: param });
    // object
    //     .save()
    //     .then(result => {
    //         console.log(result);
    //     }).catch(err => console.log(err));

    //     res.writeHead(200, {
    //         'Content-Type': 'text/plain'
    //     });
    //     res.end("Topic Created");

    var query = {topic: param},
        update = { topic: param },
        options = { upsert: true, new: true, setDefaultsOnInsert: true };

    // //first you wanna check if topic exists, only then update
    Topic.findOneAndUpdate(query, update, options, function (error, result) {

        console.log(result);

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end("Topic Created");
    });

});







module.exports = router;