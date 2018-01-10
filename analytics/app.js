var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', function(req, res) {
  res.send('Hello world');
});

async function getProcessorConnection(location){
	if(!process.env.DATABASE_URL){
		process.env.DATABASE_URL = 'postgres://ihkqplnmntkvkg:b6dd6aa348ee57370293e6c600042caa3f4c774642b180be2d5cd10d317657a4@ec2-107-20-193-202.compute-1.amazonaws.com:5432/dbe1l8metldq4u';
	}
	pg.defaults.ssl = true;
	var client = new pg.Client({connectionString: process.env.DATABASE_URL});
	await client.connect();
	return await client.query("SELECT * FROM processors WHERE location = '"+location+"'");
}



app.listen(app.get('port'), function() {
  console.log('listening on port '+app.get('port'));
});

module.exports = app;
