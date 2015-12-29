'use strict';

var os = require('os');

function scanner (scanner_callback) {
	var platform = os.platform();

	switch (platform) {
		case 'darwin':
			require('./darwin')(scanner_callback);
			break;
		case 'linux':
			require('./linux')(scanner_callback);
			break;
		default:
			scanner_callback('Unsupported platform: '+platform);
	}

}

module.exports = scanner;