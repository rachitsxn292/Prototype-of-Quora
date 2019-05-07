const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
const Profile = require('../../api/models/profile');
const fs = require('fs');
var mysql1 = require('mysql');
var connection1 = mysql1.createConnection({
    user: 'quora123',
    password: 'quora123',
    host: 'quora.c4gelffb5cec.us-east-2.rds.amazonaws.com',
    database: 'quora123',
    port: "3306",
    insecureAuth: true
});

function handle_request(message, callback){
    console.log("message", message);
    mongoose.connect('mongodb+srv://root:' +
    process.env.MONGO_PASSWORD+ 
    '@cluster0-kgps1.mongodb.net/quora?retryWrites=true',
    {
        useNewUrlParser: true
    }   

    );
    switch (message.type) {
    case "postgoogle":
        Profile.findOne({ email: message.req.body.email })
        .exec()
        .then(docs => {
            if (!docs) {
                const profile = new Profile({
                    _id: new mongoose.Types.ObjectId(),
                    email: message.req.body.email,
                    fname: message.req.body.fname,
                    lname: message.req.body.lname,
                    image: message.req.body.image,
                    about: "",
                    city: "",
                    country: "",
                    companyname: "",
                    companyposition: "",
                    companystart: "",
                    companyend: "",
                    profilecredential: "",
                    educationschool: "",
                    educationstart: "",
                    educationend: "",
                    educationdegree: "",
                    state:"",
                    zipcode:"",
                    company:[],
                    education:[],
                    active:1
                });
                profile
                    .save()
                    .then(result => {
                    
                        const body = { user: message.req.body.email };
                        const token = jwt.sign({ user: body }, 'password');
                        callback(null, {
                            email: message.req.body.email,
                            fname: message.req.body.fname,
                            lname: message.req.body.lname,
                            image: message.req.body.image,
                            jwt: 'Bearer ' + token,
                        });
                    })

                    .catch(err => {
                        console.log(err);
                        callback({message:err}, null);
                    })
            }
            else {

                const body = { user: message.req.body.email };
                const token = jwt.sign({ user: body }, 'password');
                callback(null, {

                    email: message.req.body.email,
                    fname: message.req.body.fname,
                    lname: message.req.body.lname,
                    image: message.req.body.image,
                    jwt: 'Bearer ' + token,
                });
            }
        })
        .catch(err => {
            console.log(err);
            callback({message:err}, null);
        })
        break;
        case "login":
            var cipher = crypto.createCipher('aes-256-ecb', 'password');
            var mystr = cipher.update(message.req.body.password, 'utf8', 'hex') + cipher.final('hex');
            let email = message.req.body.email;
            let password = mystr;
        
            connection1.query("select * from users where email = ?", [email], (err, rows, fields) => {
                if (err) {
                    callback(err, null);
                }
        
        
                if (rows[0].email === email && rows[0].password === password) {
             
                    const body = { user: doc.email };
                    const token = jwt.sign({ user: body }, 'password');
                    callback(null, {
                        image: result.image,
                        email: doc.email,
                        fname: doc.fname,
                        lname: doc.lname,
                        jwt: 'Bearer ' + token,
                    });
                }
                else {
                    callback({message: "Invalid Credentials"} , null);
                }
            });
            break;
            
        case "post":
        
            let email = message.req.body.email;
            
            let fname = message.req.body.fname;
            let lname = message.req.body.lanme;
            var cipher = crypto.createCipher('aes-256-ecb', 'password');
            var mystr = cipher.update(message.req.body.password, 'utf8', 'hex') + cipher.final('hex');
            let password = mystr;
    
            connection1.query("insert into users (email,fname ,lname ,password) values (?,?,?,?)", [email,fname, lname, password], (err, rows, fields) => {
                if (err) {
                    callback(err,null);//500 is the internal server error
                }
                const body = { user: doc.email };
                const token = jwt.sign({ user: body }, 'password');
                callback(null, {
                    image: result.image,
                    email: doc.email,
                    fname: doc.fname,
                    lname: doc.lname,
                    jwt: 'Bearer ' + token,
                });    
            });
            break;
        case "delete":
            connection1.query("delete FROM users WHERE email = " +  mysql.escape(message.req.body.params.email), (err, rows, fields) => {
                if (err) {
                    callback(err,null);//500 is the internal server error
                }
                Profile.updateOne({ email: message.req.body.params.email }, { $set: { active: 0 } })
                    .exec()
                    .then(result => {
                        callback(null, result);
                    })
                    .catch(err => {
                        console.log(err);
                        callback(err, null);
                    })

            });
            break;

    }
}



