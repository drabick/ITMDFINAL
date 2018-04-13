var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let WebApp = require('../models/webapp');

/* GET users listing. */
router.get('/', function(req, res, next) {
  WebApp.find(function (err, webapps) {
    if (err) return console.error(err);
    res.json(webapps);
  })
});
// Post create a new record 
router.post('/', function(req, res, next) {
  let webappToCreate = new WebApp(req.body);
  bookToCreate.save(function(err, webapp){
    res.send(webapp);
    res.status(200).send();
  });
});
// Get record from DB based on ID passed
router.get('/:id', function(req, res, next) {
  WebApp.findOne({_id: req.params["id"]}, function(err, webapp) {
    if (err) return next(err);
    res.send(webapp);
    res.status(200).send();
  });
});
// Upate given record based on ID
router.put('/:id', function(req, res, next) {
  WebApp.findOneAndUpdate({_id: req.params["id"]}, req.body, function(err, webapp) {
    if (err) return next(err);
    res.status(204).send();
  });
});
//Delete record from DB based on ID passed
router.delete('/:id', function(req, res, next) {
  WebApp.deleteOne({_id: req.params["id"]}, function(err, webapp) {
    if (err) return next(err);
    res.status(204).send();
  });
});


module.exports = router;
