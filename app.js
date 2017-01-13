/**
 * Created by argam on 12/11/2016.
 */


const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /app
//app.use(favicon(path.join(__dirname, 'app', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// set static folders
app.use(express.static(path.join(__dirname, 'app')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// app.use('/', index);
// app.use('/users', users);

// require local DB models
require('./models/taskModel');

// connect to the local DB
mongoose.connect('mongodb://localhost/schoolApp_db');

var index = require('./routes/index');
// var users = require('./routes/users');
var database = require('./routes/database');

// set the server side routing for the application.
app.use('/database', database);

mongoose.connection.on('open', function () {
    console.log('mongodb is connected!');
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

app.get('/*', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

module.exports = app;
