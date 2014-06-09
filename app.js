
/**
 * Module dependencies.
 */


var express = require('express');
var routes = require('./routes');
var serverResponse = require('./routes/serverResponse');
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/simpleTestServer');
var io = require('socket.io')
var app = express();
var http = require('http')

//var events = require('./routes/socket');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon(path.join(__dirname, '/public/images/favicon.ico')));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/serverlist', routes.serverList(db));
app.get('/newserver', routes.newServer);
app.post('/addserver', routes.addServer(db));
app.get('/editserver/:id', routes.editServer(db));
app.post('/updateserver', routes.updateServer(db));
app.get('/deleteserver/:id', routes.deleteServer(db))
app.get('/info', routes.info);

//GET
app.get('/ok/:id', serverResponse.ok(db));
app.get('/notok/:id', serverResponse.notOk(db));
app.get('/delay/:id/:delay?', serverResponse.delay(db));

//POSt
app.post('/ok/:id', serverResponse.ok(db));
app.post('/notok/:id', serverResponse.notOk(db));
app.post('/delay/:id/:delay?', serverResponse.delay(db));
app.post('/info', serverResponse.info);


var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

iosocket = io.listen(server, {'log level': 1});

stop = false;
iosocket.sockets.on('connection', function (socket) {
    socket.on('stop', function (data) {
    	console.log('stopped');
    	socket.broadcast.emit('stopped');
    	stop = true;
    });
    socket.on('play', function (data) {
    	console.log('played');
    	socket.broadcast.emit('played');
    	stop = false;
    });
    socket.on('disconnect', function () {
        console.log('godbye')
    });
});