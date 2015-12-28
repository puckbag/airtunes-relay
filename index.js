'use strict';

require('dotenv').load();

var _ = require('lodash');
var airtunes = require('airtunes');
var AirTunesServer = require('nodetunes');

var server = new AirTunesServer({serverName: process.env.SERVERNAME});

function parseDevicesConfig () {
	var config_devices = (process.env.DEVICES || '').split(',');
	return _.map(config_devices, function (device) {
		var parts = (device+':::').split(':');
		return {
			host: parts[0],
			options: {
				port: parts[1],
				volume: parts[2],
				password: parts[3],
			}
		};
	});
}

function connectDevices () {
	_.forEach(parseDevicesConfig(), function (settings) {
		var device = airtunes.add(settings.host, settings.options);
	});	
}

airtunes.on('buffer', function (status) {
	console.log('airtunes buffer:', status);
});

// Client connect event for relay server receiver.
server.on('clientConnected', function (stream) {
	stream.pipe(airtunes);
});

// Client disconnect event for relay server receiver
server.on('clientDisconnected', function () {
	// nothing to do
});

// Connect to AirTunes relay end points
connectDevices();

// Start the AirTunes relay server receiver
server.start();
