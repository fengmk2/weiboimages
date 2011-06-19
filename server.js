/**
 * Mix public timeline
 */

/**
 * Module dependencies.
 */

var weibo = require('weibo')
  , express = require('express')
  , io = require('socket.io')
  , config = require('./config')
  , tapi = config.tapi
  , t_users = config.t_users;


var app = express.createServer()
  , socket_server = io.listen(app)
  , buffer_statuses = [];

// websocket
socket_server.on('connection', function(client) {
	//client.broadcast({ announcement: client.sessionId + ' connected' });
//	if(buffer_statuses.length > 0) {
//		client.send({type: 'newStatus', statuses: buffer_statuses});
//	}
	client.on('disconnect', function(){
	    client.broadcast({ announcement: client.sessionId + ' disconnected' });
	});
});

function update_public_timeline() {
	t_users.forEach(function(user) {
		tapi.public_timeline({user: user, count: 100}, function(err, statuses) {
			if(err) {
				console.log('public timeline error', user, err);
			} else {
				if(statuses && statuses.length > 0) {
					var image_statues = [];
					for(var i = 0, len = statuses.length; i < len; i++) {
						var status = statuses[i];
						if(status.thumbnail_pic) {
							image_statues.push(status);
						}
					}
					if(buffer_statuses.length === 0) {
						buffer_statuses = image_statues;
					} else {
						for(var i = image_statues.length - 1; i < 0; i--) {
							if(buffer_statuses.length >= 20) {
								buffer_statuses.pop();
								buffer_statuses.unshift(image_statues[i]);
							}
						}
					}
					socket_server.broadcast({type: 'newStatus', statuses: image_statues});
				}
			}
		});
	});
};

// check public timeline
setInterval(update_public_timeline, 10000);
update_public_timeline();

app.use(express.logger());
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');
app.register('html', require('ejs'));

// mapping
app.get('/', function index(req, res){
	res.render('index', {statuses: buffer_statuses.slice(0, 20)});
});

app.listen(config.port);