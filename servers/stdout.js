'use strict';

var AirTunesServer = require('nodetunes');

var server = new AirTunesServer({ serverName: 'NodeTunes Stdout' });

function monitorStreamData (data) {
	var now = new Date().getTime();
	var output = ['Writing for speaker:', data.length, 'bytes @', now].join(' ');
	process.stdout.write('\r' + output + '\t');
}

server.on('clientConnected', function(stream) {
	console.log('speaker: server clientConnected');
	stream.on('data', monitorStreamData);
});

server.on('clientDisconnected', function(stream) {
	console.log('\nspeaker: server clientDisconnected');
});

server.start();
