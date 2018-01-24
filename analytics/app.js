var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var firebase = require("firebase");
const admin = require('firebase-admin');
var serviceAccount = require("./analytics-firestore-key.json");
var app = express();
app.set('port', (process.env.PORT || 3000));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();



app.use('/', function(req, res) {

  db.collection('pages').add({
      name: 'events setup',
      url: 'events20#/registration/events/setup'
  });
  res.send('Hello world');
});

app.listen(app.get('port'), function() {
  console.log('listening on port '+app.get('port'));
});

module.exports = app;
