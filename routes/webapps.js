var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Question = require('../models/question');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Question.find(function (err, questions) {
    if (err) return console.error(err);
    res.json(questions);
  })
});
// Post create a new record 
router.post('/', function(req, res, next) {
  let questionToCreate = new Question(req.body);
  questionToCreate.save(function(err, question){
    res.send(question);
    res.status(200).send();
  });
});
// Get record from DB based on ID passed
router.get('/:id', function(req, res, next) {
  Question.findOne({_id: req.params["id"]}, function(err, question) {
    if (err) return next(err);
    res.send(question);
    res.status(200).send();
  });
});
// Upate given record based on ID
router.put('/:id', function(req, res, next) {
  Question.findOneAndUpdate({_id: req.params["id"]}, req.body, function(err, question) {
    if (err) return next(err);
    res.status(204).send();
  });
});
//Delete record from DB based on ID passed
router.delete('/:id', function(req, res, next) {
  Question.deleteOne({_id: req.params["id"]}, function(err, question) {
    if (err) return next(err);
    res.status(204).send();
  });
});


module.exports = router;
