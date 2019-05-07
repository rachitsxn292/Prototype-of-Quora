const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
const Profile = require('../models/profile');
var kafka = require('../kafka/client');
const fs = require('fs');

router.get('/kafkaloadbalancer', (req, res, next)=>{
    kafka.make_request("quora", req, function(err, result){
        if(err){
            console.log("Error in adding question.", err);
        }
        if (result){
            console.log("from Kafka",result);
            res.status(200).json(result);
        }
        else {
            res.status(404).json({message:"not a valid Profile"});
        }
    });
        
});



router.get('/loadbalancer', (req, res, next) => {
    
    res.status(200).json({loadbalancer:"Tested"});
    console.log("load balancer tested successfully");
        
});

router.get('/', (req, res, next)=>{
    kafka.make_request("user", {req: req, type:"get"}, function(err, result){
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        else{
            console.log(result);
            res.status(200).json(result);
               
        }
    });
        
});

router.post('/google', (req, res, next) => {
    kafka.make_request("user", {req: req, type:"postgoogle"}, function(err, result){
        if(err){
            console.log(err);
            res.status(202).json(err);
        }
        else{
            console.log(result);
            res.cookie('cookie', 'cookie', { maxAge: 900000, httpOnly: false, path: '/' });
            res.status(200).json(result);
               
        }
    });

});


router.post('/', (req, res, next) => {
    kafka.make_request("user", {req: req, type:"post"}, function(err, result){
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        else{
            console.log(result);
            res.status(200).json(result);               
        }
    });
});

router.post('/login', (req, res, next) => {
    kafka.make_request("user", {req: req, type:"login"}, function(err, result){
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        else{
            console.log(result);
            res.status(200).json(result);               
        }
    });
});


router.post('/delete', (req, res, next) => {
    kafka.make_request("user", {req: req, type:"delete"}, function(err, result){
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        else{
            console.log(result);
            res.status(200).json(result);               
        }
    });

});

module.exports = router;