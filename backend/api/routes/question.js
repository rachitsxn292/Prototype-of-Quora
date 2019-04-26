const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Question = require('../models/question');
const Follower=require('../models/follower');
// var jwt = require('jsonwebtoken');
// var crypto = require('crypto');


 //For ComponentDidMount which will show all question prepopulated for particular user
router.get('/', (req, res) => {
    var email=req.query.email;
    var query={owner:email};
    Question.find(query)
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



//For Creation of Questions
router.post('/create',(req,res)=>{
    var question=req.body.question;
    var owner=req.body.owner;
    var topic=req.body.topic;
    
    const entry = new Question({
        _id: new mongoose.Types.ObjectId(),
        question: req.body.question,
        owner:req.body.owner,
        topic: req.body.topic,
    })
      if(req.body.question)  // Condition that checks Empty Question does not get's entered
      {
            entry.save()
            .then(docs => {
                    console.log("Question Insertion",docs);
                    res.status(200).json({
                        message:"Sucessfully Inserted"
                        })
                    })
                    .catch(err => {console.log(err)
                        res.status(204).json({
                            message: "Error in Question Insert"
                })})
    }
})

//For question Edit
router.post('/edit',(req,res)=>{
    var question=req.body.question;
    // var owner=req.body.owner;
    var topic=req.body.topic;
 
    var query={$set: {question:question,topic:topic}};
    Question.update({_id:req.body._id},query).exec()
    .then(docs => {
        console.log("Question Updated",docs);
        res.status(200).json({
            message:"Sucessfully Updated"
            })
        })
  .catch(err => {console.log(err)
        res.status(204).json({
            message: "Error in Question Edit"
        })});
})

//For inserting details of follower who has followed that particular question
router.post('/follow',(req,res)=>{
    var questionid=req.body.questionid;
    var follower=req.body.follower;

    const entry = new Follower({
        _id: new mongoose.Types.ObjectId(),
        questionid: req.body.questionid,
        follower:req.body.follower,
      })
         entry.save()
            .then(docs => {
                    console.log("Details of Follower Insertion",docs);
                    res.status(200).json({
                        message:"Sucessfully Inserted"
                        })
                    })
            .catch(err => {console.log(err)
                    res.status(204).json({
                        message: "Error in Follower Insert"
            })})
   
})


module.exports = router;