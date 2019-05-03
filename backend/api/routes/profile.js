const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Profile = require('../models/profile');
var multer = require('multer');
const path = require("path");
const ProfileView = require('../models/profileview');

router.get('/', (req, res, next) => {
    Profile.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

});

router.get('/email', (req, res, next) => {
    const email = req.query.email;
    Profile.findOne({ email: email })
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({ message: "not a valid Email ID" });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })

});


router.get('/id', (req, res, next) => {
    const id = req.query.id;
    Profile.findOne({ _id: id })
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                var view = doc.views;
                var email = doc.email;
                view = view + 1;
                Profile.update({ _id: id }, { $set: { views: view } })
                    .exec()
                    .then(result => {
                        console.log(result);

                    })
                    .catch(err => {
                        console.log(err);

                    });

                const profileview = new ProfileView({
                    _id: new mongoose.Types.ObjectId(),
                    email: email,
                });
                profileview
                    .save()
                    .then(result => {
                        console.log(result);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({ message: "not a valid ID" });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })

});

router.patch("/", (req, res, next) => {



    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    const email = updateOps.email;
    console.log("updateOps", updateOps);
    console.log("email", email);
    Profile.update({ email: email }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Update Was Successful"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
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


router.post('/imgupload', (req, res, next) => {
    upload(req, res, (err) => {

        console.log("Request ---", req.body);
        console.log("Request file ---", JSON.stringify(req.file));  //Here you get file.
        var filepath = req.file;
        var filepath = "http://localhost:3000/uploads/" + filepath.filename;
        var email = req.body.email;

        Profile.update({ email: email }, { $set: { image: filepath } })
            .exec()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    message: filepath
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });



    });

});

router.get('/education', (req, res, next) => {
    const email = req.query.email;
    Profile.findOne({ email: email }, { "education": 1, "company": 1 })
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({ message: "not a valid Email ID" });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })

});



module.exports = router;