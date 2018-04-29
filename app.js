var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mustacheExpress = require('mustache-express');
let Question = require('./models/question');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
//mongoose.connect('mongodb://heroku_109zmfrg:tnet46128c07k6co2snu024c87@ds247699.mlab.com:47699/heroku_109zmfrg');
var questions = require('./routes/questions');


var app = express();
app.disable('etag');
// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

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

app.get('/resume', function (req, res) {
  res.render('resume', {});
});

app.get('/delete/:id', function (req, res) {
  Question.deleteOne({_id: req.params["id"] }, function (err, question) {
    if (err) return next(err);
    res.redirect('/');
  });
});

app.post('/answered/:id', function (req, res) {
  Question.findOneAndUpdate({_id: req.params["id"]}, req.body, function(err, question) {
    if (err) return next(err);
    res.redirect('/');
  });
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
