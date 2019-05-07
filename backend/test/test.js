const express = require('express');
const app = express();

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;
var assert = require('chai').assert;

var agent = require('chai').request.agent(app);

describe('Message Content', function(){

  it('GET /messages',function(){
      agent.get('/messages').query({to: 'nehals0809@gmail.com', from:'rishabh.libra53@gmail.com'})
          .then(function(res){
             expect(res.body[0].content).to.equal('Hello Nehal !!!');
            });
  });
})

describe('Profile', function(){

  it('GET /profile',function(){
      agent.get('/profile')
          .then(function(res){
             console.log(res.body);
      expect(res.body).to.be.an('array');
            });
  });
})

describe('Topic', function(){

  it('GET /topic/isfollowed',function(){
      agent.get('/topicisfollowed')
          .then(function(res){
             expect(res).to.have.status(200);
            });
  });
})

describe('Question', function(){

  it('GET /question/noLogQues',function(){
      agent.get('/questionnoLogQues')
          .then(function(res){
             expect(res).to.have.status(200);
             expect(res).to.be.json;
        expect(res.body).to.be.an('array');
            });
  });
})

describe('Answers', function(){

  it('GET /answers',function(){
      agent.get('/answers')
          .then(function(res){
             expect(res).to.have.status(200);
             expect(res).to.be.json;
        expect(res.body).to.be.an('array');
            });
  });
})

describe('Search Topic', function(){

  it('GET /search/topic',function(){
      agent.get('/search/topic')
          .then(function(res){
             expect(res).to.have.status(200);
             expect(res).to.be.json;
        expect(res.body).to.be.an('array');
            });
  });
})

describe('User', function(){

  it('GET /user/google',function(){
      agent.get('/usergoogle')
          .then(function(res){
             expect(res).to.have.status(200);
             expect(res).to.be.json;
        expect(res.body).to.be.an('array');
            });
  });
})

describe('Sent Messages', function(){

  it('GET /messagessent',function(){
      agent.get('/messagessent')
          .then(function(res){
             expect(res).to.have.status(200);
             expect(res).to.be.json;
        expect(res.body).to.be.an('array');
            });
  });
})

describe('Create Question', function(){

  it('GET /questioncreated',function(){
      agent.get('/questioncreated')
          .then(function(res){
             expect(res).to.have.status(200);
             expect(res).to.be.json;
        expect(res.body).to.be.an('array');
            });
  });
})

describe('Answer Specific Question', function(){

  it('GET /answers/one',function(){
      agent.get('/answersone')
          .then(function(res){
             expect(res).to.have.status(200);
             expect(res).to.be.json;
        expect(res.body).to.be.an('array');
            });
  });
})

describe('Profile ID', function(){

  it('GET /profileid',function(){
      agent.get('/profileid')
          .then(function(res){
             expect(res).to.have.status(200);
             expect(res).to.be.json;
        expect(res.body).to.be.an('array');
            });
  });
})
