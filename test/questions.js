let mongoose = require("mongoose");
let Question = require('../models/question');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let http = require('http');

let server = http.createServer(app);
let should = chai.should();

chai.use(chaiHttp);

describe('Questions', () => {
  before(done => {
    // Start the server
    server.listen(0);
    done();
  });

  beforeEach(done => { 
    // Before each test we empty the database
    Question.remove({}, (err) => { 
      done();         
    });     
  });

  after(done => {
  // After all tests we close the server and disconnect from the database
  server.close();
  mongoose.disconnect();
  done();
  });

  describe('GET /api/questions', () => {
    it('it should GET all the questions', (done) => {
    	let expectedQuestion = new Question({
    		user: "user",
    		subject: "test",
        question: "Test question",
        comments: "Test comment"
    	})

    	expectedQuestion.save(function (err, question) {
  	      if (err) return console.error(err);
          chai.request(server)
              .get('/api/questions')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(1);
                done();
              });
  	  });
    });
  });

  describe('POST /api/questions', () => {
    it('it should add a new question', (done) => {
    	let expectedQuestion = new Question({
    		user: "user",
    		subject: "test",
        question: "Test question",
        comments: "Test comment"
    	});

      chai.request(server)
          .post('/api/questions')
          .send(expectedQuestion)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property("id");
            res.body.should.have.property("user").eql(expectedQuestion.user);
            res.body.should.have.property("subject").eql(expectedQuestion.subject);
            res.body.should.have.property("question").eql(expectedQuestion.question);
            res.body.should.have.property("comments").eql(expectedQuestion.comments);            
            done();
          });
    });
  }); 


  describe('GET /api/questions/:id', () => {
    it('it should get an existing question', (done) => {
      let existingQuestion = new Question({
    		user: "user",
    		subject: "test",
        question: "Test question",
        comments: "Test comment"
      });

      existingQuestion.save(function (err, question) {
        if (err) return console.error(err);
        chai.request(server)
          .get('/api/questions/' + question.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property("id");
            res.body.should.have.property("user").eql(existingQuestion.user);
            res.body.should.have.property("subject").eql(existingQuestion.subject);
            res.body.should.have.property("question").eql(existingQuestion.question);
            res.body.should.have.property("comments").eql(existingQuestion.comments);            
            done();
          });
      });
    });
  });

  describe('PUT /api/questions/:id', () => {
    it('it should update an existing question', (done) => {
      let existingQuestion = new Question({
    		user: "user",
    		subject: "test",
        question: "Test question",
        comments: "Test comment"
      });
      let expectedQuestion = new Question({
        user: existingQuestion.user,
        subject: existingQuestion.subject,
        question: existingQuestion.question,
        comments: existingQuestion.comments        
      });

      existingQuestion.save(function (err, question) {
        if (err) return console.error(err);
        chai.request(server)
          .put('/api/questions/' + question.id)
          .send(expectedQuestion)
          .end((err, res) => {
            res.should.have.status(204);
            res.body.should.be.empty;

            Question.findOne({_id: existingQuestion.id}, function(err, foundQuestion) {
              if (err) return console.error(err);
              foundQuestion.should.have.property("user").eql(expectedQuestion.user);
              foundQuestion.should.have.property("subject").eql(expectedQuestion.subject);
              foundQuestion.should.have.property("question").eql(expectedQuestion.question);
              foundQuestion.should.have.property("comments").eql(expectedQuestion.comments);              
              done();
            })
          });
      });
    });
  });

  describe('DELETE /api/questions/:id', () => {
    it('it should delete an existing question', (done) => {
      let existingQuestion = new Question({
    		user: "user",
    		subject: "test",
        question: "Test question",
        comments: "Test comment"
      });

      existingQuestion.save(function (err, question) {
        if (err) return console.error(err);
        chai.request(server)
          .delete('/api/questions/' + question.id)
          .end((err, res) => {
            res.should.have.status(204);
            res.body.should.be.empty;

            Question.findOne({_id: existingQuestion.id}, function(err, question) {
              if (err) return console.error(err);
              should.not.exist(question);
              done();
            })
          });
      });
    });
  });

});