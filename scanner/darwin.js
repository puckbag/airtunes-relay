'use strict';

var _     = require('lodash');
var os    = require('os');
var exec  = require('child_process').exec;
var async = require('async');

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
function escapeRegExp(string){
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// http://stackoverflow.com/a/22827128/1596013
function escapeShellArg (arg, quote) {
	quote = quote || "'";
    return quote + arg.replace(quote, quote+"\\"+quote+quote) + quote;
}

function scanner (scanner_callback) {
	// Mountain Lion 12.0.0 replaces mDNS with dns-sd
	var mdns = (os.release() < '12') ? 'mDNS' : 'dns-sd';
	var command_options = command_options || { timeout: 300 };

	var command;

	// discover devices
	command = mdns + ' -B _raop._tcp';
	exec(command, command_options, function (error, stdout) {
		var devices = {};

		stdout.trim().split('\n').forEach(function(line) {
			var res = /(\S+)\s+_raop\._tcp\.\s+([^@]+)@(.*)/.exec(line);
			if (!res) {
				return;
			}

			devices[res[2]+'@'+res[3]] = {
				domain: res[1],
				mac: res[2],
				name: res[3],
				hostname: null,
				ipaddress: null,
				port: null
			};
		});

		// https://github.com/caolan/async/issues/689#issuecomment-69080159
		async.map(_.pairs(devices), function (tuple, callback) {
			var key = tuple[0];
			var item = tuple[1];
			var id = item.mac + '@' + item.name;
			var command;

			// hostname
			item.hostname = item.name.replace(/\s+/g, '-') + '.' + item.domain;

			// hostname & port
			command = mdns + " -L " + escapeShellArg(id) + " _raop._tcp " + escapeShellArg(item.domain);
			exec(command, command_options, function (error, stdout) {
				// var command;
				var res = /can be reached at\s+(\S*)\s*:(\d+)/.exec(stdout);
				if (!res) {
					console.log(command, stdout);
					callback(null, item);
					return;
				}

				item.hostname = res[1];
				item.port = res[2];

				// ipaddress
				command = mdns + " -G v4 " + escapeShellArg(item.hostname);
				exec(command, command_options, function (err, stdout) {
					var pattern = escapeRegExp(item.hostname)+'\\s+(\\S+)\\s+';
					var regex = new RegExp(pattern);
					var res = regex.exec(stdout);
					if (res) {
						item.ipaddress = res[1];
					}
					callback(null, [key, item]);
				});
			});

		}, function (err, result) {
			if (err) return scanner_callback(err);
			scanner_callback(err, _.zipObject(result));
		});

	});
}

module.exports = scanner;