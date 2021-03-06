// SETUP:
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var request = require('request');
var path = require('path');
var socket = require('socket.io')(http);

// OBJECTS:
var SongManager = require("./SongManager.js").SongManager;
var songManager = new SongManager();
var User = require("./User.js").User;

// MEMORY:
var PORT = process.env.PORT || 3020;
var users = [];

// SETUP:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));

app.use(express.static(path.join(__dirname, '../dist')));

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var setEventHandlers = function() {
	socket.sockets.on("connection", onInit);
};

var onInit = function(client) {
	client.on("connect", onConnect);
	client.on("add song", onAddSong);
	client.on("vote", onVote);
};

var onConnect = function(data) {
	users.push(new User(this.id));
	socket.to(this.id).emit("update songs", {
		songs : songs
	});
}

var onAddSong = function(data) {
	songManager.addSong(data);
	publishSongs();
}

var onVote = function(data) {
	songManager.postVote(data);
	publishSongs();
}

var publishSongs = function() {
	users.forEach(function(user) {
		sockets[player.id].emit("update songs", {
			songs : songManager.songs
		});
	});
}

setEventHandlers();

app.listen(PORT, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:' + PORT);
});