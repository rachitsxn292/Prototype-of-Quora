const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
const Profile = require('../models/profile');


router.get('/', (req, res, next) => {
    User.find()
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

router.post('/google', (req, res, next) => {
    Profile.find({ email: req.body.email })
        .exec()
        .then(docs => {
            if (docs) {
                const profile = new Profile({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    fname: req.body.fname,
                    lname: req.body.lname,
                    image: req.body.image,
                    mobile: "",
                    about: "",
                    city: "",
                    country: "",
                    company: {
                        name: "",
                        position: "",
                        start: "",
                        end: ""
                    },
                    career: "",
                    hometown: "",
                    languages: "",
                    gender: "",
                    profilecredential: "",
                    education: {
                        school: "",
                        start: "",
                        end: "",
                        degree: ""
                    }

                });
                profile
                    .save()
                    .then(result => {
                        res.cookie('cookie', 'cookie', { maxAge: 900000, httpOnly: false, path: '/' });

                        const body = { user: req.body.email };
                        const token = jwt.sign({ user: body }, 'password');
                        res.status(200).json({

                            email: req.body.email,
                            fname: req.body.fname,
                            lname: req.body.lname,
                            image: req.body.image,
                            jwt: 'Bearer ' + token,
                        });
                    })

                    .catch(err => {
                        console.log(err);
                        res.status(202).json({
                            message: err
                        })
                    })
            }
            else {
                res.cookie('cookie', 'cookie', { maxAge: 900000, httpOnly: false, path: '/' });

                const body = { user: req.body.email };
                const token = jwt.sign({ user: body }, 'password');
                res.status(200).json({

                    email: req.body.email,
                    fname: req.body.fname,
                    lname: req.body.lname,
                    image: req.body.image,
                    jwt: 'Bearer ' + token,
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(202).json({
                message: err
            })
        })


});


router.post('/', (req, res, next) => {
    var cipher = crypto.createCipher('aes-256-ecb', 'password');
    var mystr = cipher.update(req.body.password, 'utf8', 'hex') + cipher.final('hex');
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        fname: req.body.fname,
        lname: req.body.lname,
        password: mystr,

    });
    user
        .save()
        .then(result => {
            console.log(result);

            Profile.find({ email: req.body.email })
                .exec()
                .then(docs => {
                    if (docs) {
                        const profile = new Profile({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            fname: req.body.fname,
                            lname: req.body.lname,
                            image: "",
                            mobile: "",
                            about: "",
                            city: "",
                            country: "",
                            company: {
                                name: "",
                                position: "",
                                start: "",
                                end: ""
                            },
                            career: "",
                            hometown: "",
                            languages: "",
                            gender: "",
                            profilecredential: "",
                            education: {
                                school: "",
                                start: "",
                                end: "",
                                degree: ""
                            }

                        });
                        profile
                            .save()
                            .then(result1 => {
                                console.log(result1);
                                res.status(200).json({message:"User Created Successfully"});
                            })

                            .catch(err => console.log(err));
                            
                    }
                    else {
                        res.status(200).json({message:"User Created Successfully"});

                    }
                });



        });
});


router.get('/:userId', (req, res, next) => {
    const email = req.params.userId;
    User.findOne({ email: email })
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
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

router.post('/login', (req, res, next) => {
    console.log("req.body",req.body)
    var cipher = crypto.createCipher('aes-256-ecb', 'password');
    var mystr = cipher.update(req.body.password, 'utf8', 'hex') + cipher.final('hex');

    User.findOne({ email: req.body.email })
        .exec()
        .then(doc => {
            if(doc){
                console.log("From database", doc);
            Profile.findOne({ email: req.body.email })
                .exec()
                .then(result => {
                    if (doc.password === mystr && doc.role === req.body.role) {

                        res.cookie('cookie', 'cookie', { maxAge: 900000, httpOnly: false, path: '/' });

                        const body = { user: doc.email };
                        const token = jwt.sign({ user: body }, 'password');
                        res.status(200).json({
                            image: result.image,
                            email: doc.email,
                            fname: doc.fname,
                            lname: doc.lname,
                            jwt: 'Bearer ' + token,
                        });
                    }
                    else {
                        res.status(202).json({ message: "Invalid Credentials" });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: err });
                })




        
            }
            else{
                res.status(202).json({ message: "Invalid User" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })

});

module.exports = router;