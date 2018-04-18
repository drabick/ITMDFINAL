var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mustacheExpress = require('mustache-express');
let Question = require('./models/question');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var questions = require('./routes/questions');


var app = express();
app.disable('etag');
// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use('/api/questions', questions);

app.get('/', function (req, res) {
  Question.find(function (err, questions) {
    if (err) return console.error(err);
    res.render('index', { questions });
  })
});

app.get('/clientside', function (req, res) {
    res.render('ClientSide', {});
  });

app.get('/serverside', function (req, res) {
    res.render('ServerSide', {});
  });
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
