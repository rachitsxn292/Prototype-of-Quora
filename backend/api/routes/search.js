const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
const Profile = require('../models/profile');


router.get('/profile', (req, res, next) => {
    const search = req.query.search;
    if(search){
        Profile.find({ 'fname': { '$regex': search, '$options': 'i' } })
        .exec()
        .then(profile => {
            console.log({ profile: profile })
            res.status(200).json({ profile: profile });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
    }
    else{
        res.status(200).json({ profile: []});
    }
   

});

router.get('/user', (req, res, next) => {
    const search = req.query.search;
    if(search){
    User.find({ 'email': { '$regex': search, '$options': 'i' } })
        .exec()
        .then(user => {

            res.status(200).json({ user: user });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
    }
    else{
        res.status(200).json({ user: []});
    }

});



module.exports = router;