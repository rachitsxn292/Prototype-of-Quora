const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Answers = require('../models/answers');
const Comments = require('../models/comments');
const Questions = require('../models/question');
const Votes = require('../models/votes');
const Bookmarks = require('../models/bookmarks');
var multer = require('multer');
const path = require("path");

//to get all answers for a particular question
router.get('/', (req, res) => {
    const id = req.query._id;
    Answers.find({ questionID: id })
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});


//to get one answers for a particular question to be displayed on homepage
router.get('/one', (req, res) => {
    const id = req.query._id;
    console.log(id);
    Answers.findOne({ questionID: id })
        .exec()
        .then(docs => {
            if (docs) {
                console.log(docs);
                res.status(200).json(docs);
            }
            else {
                res.status(200).send('');
            }
            // res.status(200).json(docs);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
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
    upload(req, res, (err) => {
        console.log("Request ---", req.body);

        if (!req.file) {
            filepath = ''
        }
        else {
            console.log("Request file ---", JSON.stringify(req.file));  //Here you get file.
            var filepath = req.file;
            var filepath = filepath.filename;
        }
        const answer = new Answers({
            _id: new mongoose.Types.ObjectId(),
            questionID: req.body._id,
            owner: req.body.email,
            answer: req.body.answer,
            isAnonymous: req.body.anonymousStatus,
            isCommentable: req.body.commentable,
            isVotable: req.body.votable,
            upVote: 0,
            downVote: 0,
            views: 0,
            fname: req.body.fname,
            lname: req.body.lname,
            image: req.body.image,     
            question: req.body.question
        });

        if (req.body.answer) {
            Answers.find({ owner: req.body.email, questionID: req.body._id }).exec().then(result => {
                if (result.length > 0) {
                    res.status(200).json({
                        message: "You have already answered this question"
                    })
                }

                else {
                    answer.save()
                        .then(result => {
                            console.log(result);
                            res.status(200).json({
                                message: "Successfully Inserted!"
                            })
                        }).catch(err => {
                            res.status(200).json({
                                message: "Unable to add your answer"
                            })
                        });
                }
            })
        }
    });
});




//to edit an existing answer 
router.post('/edit', (req, res) => {
    console.log('ID: ', req.body._id);
    console.log('EMAIL', req.body.email);
    console.log('ANSWER ', req.body.answer);
    console.log('ANONYMITY ', req.body.anonymousStatus);
    Answers.update({ _id: req.body._id, owner: req.body.email }, { $set: { answer: req.body.answer, isAnonymous: req.body.anonymousStatus } })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Successfully Edited"
            });
        }).catch(err => {
            console.log(err);
            res.status(200).json({
                message: "Coul not be Edited"
            });
        });

});


//to upvote an answer
router.post('/upvote', (req, res) => {

    Votes.find({ answerID: req.body._id, owner: req.body.email }).then(result => {
        if (result.length > 0) {
            res.status(200).json({
                flag: false,
                message: "You are not allowed to vote more than once"
            })
        }
        else {
            Answers.update({ _id: req.body._id }, { $inc: { upVote: 1, views: 1 } })
                .exec()
                .then(result => {
                    console.log(result);
                    const vote = new Votes({
                        _id: new mongoose.Types.ObjectId(),
                        answerID: req.body._id,
                        owner: req.body.email,
                        upVote: true,
                        downVote: false
                    });

                    vote.save().then(result => {
                        console.log(result);
                        res.status(200).json({
                            flag: true,
                            message: "Successfully Upvoted"
                        })
                    }).catch(err => {
                        console.log(err);
                    })
                }).catch(err => {
                    console.log(err);
                });
        }
    }).catch(err => {
        console.log(err);
    })


});


//to downvote an answer
router.post('/downvote', (req, res) => {
    Votes.find({ answerID: req.body._id, owner: req.body.email }).then(result => {
        if (result.length > 0) {
            res.status(200).json({
                flag: false,
                message: "You are not allowed to vote more than once"
            })
        }
        else {
            Answers.update({ _id: req.body._id }, { $inc: { upVote: 1, views: 1 } })
                .exec()
                .then(result => {
                    console.log(result);
                    const vote = new mongoose({
                        _id: new mongoose.Types.ObjectId(),
                        answerID: req.body._id,
                        owner: req.body.email,
                        upVote: false,
                        downVote: true
                    });

                    vote.save().then(result => {
                        console.log(result);
                        res.status(200).json({
                            flag: true,
                            message: "Successfully Downvoted"
                        })
                    }).catch(err => {
                        console.log(err);
                    })
                }).catch(err => {
                    console.log(err);
                });


        }
    })
});


//to comment on an answer
router.post('/comment', (req, res) => {
    Answers.find({ _id: req.body._id }).exec().then(result => {
        if (result.length > 0) {
            const comment = new Comments({
                _id: new mongoose.Types.ObjectId(),
                answerID: req.body._id,
                comment: req.body.comment
            });

            if (req.body.comment) {
                comment.save().then(result => {
                    console.log(result);
                    res.status(200).json({
                        message: "Successfully Commented"
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(204).json({
                        message: "Comment Unsuccessful"
                    });
                })
            }
        }
    })
});



router.get('/comment', (req, res) => {
    const id = req.query._id;
    console.log('COMMENTS', id);
    Comments.find({ answerID: id }).exec().then(docs => {
        console.log.bind('COMMENTS', docs);
        if (docs.length > 0) {
            res.status(200).json(docs);
        }
        else {
            res.status(200).json({ message: "No Comments for this answer" })
        }
    }).catch(err => {
        res.status(204).json({
            err: err
        })
    });
});


//to get a particular answer posted by that user
router.get('/useranswer', (req, res) => {
    Answers.find({ owner: req.query.email }).exec().then(result => {
        if (result.length > 0) {
            res.status(200).json(result);
        }
        else {
            res.status(204).json({
                message: "No Answers found"
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(204).json({
            message: "Error"
        });
    });
});


//to get question that user answered
router.get('/question', (req, res) => {
    Questions.find({ _id: req.query._id }).exec().then(docs => {
        if (docs.length > 0) {
            console.log('MY QUESTION ', docs)
            res.status(200).json(docs);
        }
        else {
            res.status(204).json({
                message: "No Questions Found"
            })
        }
    }).catch(err => {
        console.log(err);
        res.status(204).json({
            message: "Error"
        });
    })
});


router.post('/bookmark', (req, res) => {
    var answerID = req.body._id;
    var questionID = req.body.questionID;
    var answer = req.body.answer;
    var email = req.body.email;
    Bookmarks.find({ answerID: answerID, owner: email }).then(result => {
        if (result.length > 0) {
            Bookmarks.remove({ answerID: answerID, owner: email }).then(resultBook => {
                res.status(200).json({
                    bookmarked: false
                });
            });
        }
        else {
            const bookmark = new Bookmarks({
                _id: new mongoose.Types.ObjectId(),
                questionID: questionID,
                answerID: answerID,
                owner: email,
                answer: answer
            });

            bookmark.save().then(result => {
                console.log(result);
                res.status(200).json({
                    bookmarked: true
                })
            });
        }
    })
})

router.get('/bookmark', (req, res) => {
    var questionID = req.query.questionID;
    var email = req.query.email;
    Bookmarks.find({ questionID: questionID, owner: email }).then(result => {
        if (result.length > 0) {
            res.status(200).json(result);
        }
        else {
            res.status(200).json({
                message: "No Bookmarked answers found"
            })
        }
    })
})

router.post('/views', (req, res) => {
    var questionID = req.body.questionID;
    Answers.update({ questionID: questionID }, { $inc: { views: 1 } }, { multi: true }).then(resultA => {
        console.log(resultA);
        Questions.update({ _id: questionID }, { $inc: { views: 1 } }, { multi: true }).then(resultQ => {
            console.log(resultQ);
            res.status(200).json({
                message: 'You view this answer'
            })
        })
    });

})


//get answers by user
router.get('/answered', (req, res) => {
    var owner=req.query.owner;
    var query={owner:owner};
    Answers.find(query)
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

module.exports = router;