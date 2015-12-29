'use strict';

var scanner = require('./scanner');

scanner(function (err, devices) {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(devices);
});