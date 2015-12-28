'use strict';

var AirTunesServer = require('nodetunes');
var Speaker = require('speaker');

var server = new AirTunesServer({ serverName: 'NodeTunes Stdout' });

server.on('clientConnected', function(stream) {
  console.log('speaker: server clientConnected');
  stream.on('data', function(d) {
    process.stdout.write('\rWriting for speaker: ' + d.length + ' bytes @ ' + new Date().getTime() + '\t');
  });
  stream.pipe(process.stdout);
});

server.on('clientDisconnected', function(stream) {
  console.log('speaker: server clientDisconnected');
});

server.start();
