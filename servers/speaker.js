'use strict';

var AirTunesServer = require('nodetunes');
var Speaker = require('speaker');

var speaker = new Speaker({
	channels: 2,
	bitDepth: 16,
	sampleRate: 44100,
});
var server = new AirTunesServer({ serverName: 'NodeTunes Speaker' });

server.on('clientConnected', function(stream) {
	console.log('speaker: server clientConnected');
	stream.pipe(speaker);
});

server.on('clientDisconnected', function(stream) {
	console.log('speaker: server clientDisconnected');
});

server.start();
