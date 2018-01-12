var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var firebase = require("firebase");

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var config = {
  apiKey: "AIzaSyC4HtpVry_bdAD5HJAnTTlXFUbHhSdia44",
  authDomain: "analytics-d61b6.firebaseapp.com",
  databaseURL: "https://analytics-d61b6.firebaseio.com",
  projectId: "analytics-d61b6",
  storageBucket: "analytics-d61b6.appspot.com",
  messagingSenderId: "525213599205"
};
firebase.initializeApp(config);


app.use('/', function(req, res) {
  firebase.database().ref('/pages/').set({
    eventsetup:{
      name: 'Event Setup',
      url: 'events20#/registration/events/setup'
    }
  });
  res.send('Hello world');
});

app.listen(app.get('port'), function() {
  console.log('listening on port '+app.get('port'));
});

module.exports = app;
