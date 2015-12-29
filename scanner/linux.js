'use strict';

var exec  = require('child_process').exec;
var async = require('async');

function decodeDecimalEncodedCharacters (value) {
	value = value || '';
	function replacer (match, p1, offset, string) {
		return String.fromCharCode(p1);
	};
	return value.replace(/\\(\d{3})/g, replacer);
}

function scanner (scanner_callback) {
	// TODO: detect avahi-browse

	// -p : parsable (; delimited)
	// -r : auto resolve
	// -t : terminate (auto ^C)
	// ^= : resolved
	// var command = 'cat ./test-data/avahi-browse.txt';
	var command = 'avahi-browse -p -r -t _raop._tcp | grep ^= | grep IPv4';
	var options = {};

	exec(command, options, function (err, stdout) {
		var devices = {};

		stdout.trim().split('\n').forEach(function(line) {
			var fields = line.split(';');
			var id = decodeDecimalEncodedCharacters(fields[3]);
			var id_parts = id.split('@');
			if (!id) {
				return;
			}

			devices[id] = {
				domain: fields[5],
				mac: id_parts[0],
				name: id_parts[1],
				hostname: fields[6],
				ipaddress: fields[7],
				port: fields[8]
			};
		});

		scanner_callback(null, devices);
	});
}

module.exports = scanner;