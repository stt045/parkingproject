
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var parking = index;
var login = require('./routes/login');
var welcome = require('./routes/welcome');
var permit = require('./routes/permit');
var reminders = require('./routes/reminders');
var setReminder = require('./routes/setReminder');
var help = require('./routes/help');
var settings = require('./routes/settings');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.view);
app.get('/parking', index.view);
app.get('/reminders', reminders.view);
app.get('/settings', settings.view);
app.get('/setReminder', setReminder.view);
app.get('/login', login.view);
app.get('/welcome', welcome.view);
app.get('/help', help.view);
app.get('/permit', permit.view);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
