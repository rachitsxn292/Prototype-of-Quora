
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Question = require('../models/question');
const Follower = require('../models/follower');
const Topics =require('../models/topic');
const Notifications = require('../models/notifications');
const fs = require('fs');
// var jwt = require('jsonwebtoken');
// var crypto = require('crypto');

//5 questions to display when user is not logged in
router.get('/noLogQues', (req, res) => {
    kafka.make_request("quora", {"type":"questions/noLogQues",req:req}, function (err, result) {
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


//questions to display when user is logged in using pagination
router.get('/logQues', (req, res) => {
    kafka.make_request("quora", {"type":"questions/logQues",req:req}, function (err, result) {

        if (err) {       
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("Question Logged");
        }
        else {
            res.status(200).json(result);
        }
    });
    
    });

//get questions created by user
router.get('/created', (req, res) => {
    kafka.make_request("quora", {"type":"questions/created",req:req}, function (err, result) {

        if (err) {       
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("Question Created");
        }
        else {
            res.status(200).json(result);
        }
    });
    
    });

//For ComponentDidMount which will show all question prepopulated for particular user
router.get('/', (req, res) => {
    kafka.make_request("quora", {"type":"question/post",req:req}, function (err, result) {

        if (err) {       
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("Questions Fetched");
        }
        else {
            res.status(200).json(result);
        }
    });
    
    });

// for search questions
router.get('/search', (req, res) => {
    kafka.make_request("quora", {"type":"questions/search",req:req}, function (err, result) {

        if (err) {       
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("Question Seacrhed");
        }
        else {
            res.status(200).json(result);
        }
    });
    
    });

//For getting Items for dropdown list fof topics
router.get('/topics', (req, res) => {
    kafka.make_request("quora", {"type":"questions/topics",req:req}, function (err, result) {

        if (err) {       
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("Topic Fetched");
        }
        else {
            res.status(200).json(result);
        }
    });
    
    });

//For Creation of Questions
router.post('/create',(req,res)=>{
    kafka.make_request("quora", {"type":"questions/created",req:req}, function (err, result) {

        if (err) {       
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("Questions Created");
        }
        else {
            res.status(200).json(result);
        }
    });
    
    });
//For question Edit
router.post('/edit',(req,res)=>{
    kafka.make_request("quora", {"type":"questions/edit",req:req}, function (err, result) {

        if (err) {       
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("Questions Edited");
        }
        else {
            res.status(200).json(result);
        }
    });
    
    });
//For inserting details of follower who has followed that particular question
router.post('/follow', (req, res) => {
    
    kafka.make_request("quora", {"type":"questions/follow",req:req}, function (err, result) {

        if (err) {       
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("Follower Details INserted");
        }
        else {
            res.status(200).json(result);
        }
    });
    
    });

router.get('/followNumber', (req, res) => {
    kafka.make_request("quora", {"type":"questions/followNumber",req:req}, function (err, result) {

        if (err) {       
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("Follower Fetched");
        }
        else {
            res.status(200).json(result);
        }
    });
    
    });


//get questions related to a topic
router.get('/topicquestion', (req, res) => {
    kafka.make_request("quora", {"type":"questions/topicquestion",req:req}, function (err, result) {

        if (err) {       
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("Question Fetched By Topic");
        }
        else {
            res.status(200).json(result);
        }
    });
    
    });

//For getting list of questions followed by particular user
router.get('/questionfollow', (req, res) => {
    kafka.make_request("quora", {"type":"questions/questionfollow",req:req}, function (err, result) {

        if (err) {       
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("Question follow details ");
        }
        else {
            res.status(200).json(result);
        }
    });
    
    });


//For force Creation of Questions
router.post('/createtest',(req,res)=>{

    kafka.make_request("quora", {"type":"questions/createtest",req:req}, function (err, result) {

        if (err) {       
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("Test Created");
        }
        else {
            res.status(200).json(result);
        }
    });
    
    });






//For getting questions followed by a user
router.get('/followedquestions',(req,res)=>{

    kafka.make_request("quora", {"type":"questions/followedquestions",req:req}, function (err, result) {

        if (err) {       
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("followedquestions Created");
        }
        else {
            res.status(200).json(result);
        }
    });
    
    });

module.exports = router;