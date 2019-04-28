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

    upload(req, res, (err) => {
        const param = req.body.param;
        var picName = req.file.originalname;
        if(req.file.originalname == null || req.file.originalname == "")
        {
            picName = "default.jpg"; //if no pic was uploaded display default
        }
        var data =  { topic: param, picture: picName};
        var query = { topic: param },
            options = { upsert: true, new: true, setDefaultsOnInsert: true };

        //console.log("Request file ---", JSON.stringify(req.file));  //Here you get file.
        var filepath = req.file;   
        var filepath = filepath.filename;

        // //first you wanna check if topic exists, then create else update
        Topic.findOneAndUpdate(query,    {  $set : data}, options, function (error, result) {
                console.log("resiult", error)
           console.log("inside")
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("Topic Created");
        });

    }); //upload end
});




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


module.exports = router;