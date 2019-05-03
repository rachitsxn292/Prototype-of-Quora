const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
const Profile = require('../models/profile');
const Question = require('../models/question');
const Topic = require('../models/topic');

router.get('/profile', (req, res, next) => {
    const search = req.query.search;
    if(search){
        Profile.find({ 'fname': { '$regex': search, '$options': 'i' } }).limit(3)
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
    User.find({ 'email': { '$regex': search, '$options': 'i' } }).limit(3)
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

router.get('/question', (req, res, next) => {
    const search = req.query.search;
    if(search){
    Question.find({ 'question': { '$regex': search, '$options': 'i' } }).limit(3)
        .exec()
        .then(question => {

            res.status(200).json({ question: question });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
    }
    else{
        res.status(200).json({ question: []});
    }

});

router.get('/topic', (req, res, next) => {
    const search = req.query.search;
    if(search){
        Topic.find({ 'topic': { '$regex': search, '$options': 'i' } }).limit(3)
        .exec()
        .then(topic => {

            res.status(200).json({ topic: topic });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
    }
    else{
        res.status(200).json({ topic: []});
    }

});



module.exports = router;