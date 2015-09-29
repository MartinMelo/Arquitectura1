'use strict';

/**
 * Cargo el ambiente necesario, por defecto es el de development.
 * @type {string}
 */
//process.env.NODE_ENV = 'development';
process.argv.forEach(function (val, index, array) {
    if(val === '--production'){
        process.env.NODE_ENV = 'production';
    }
});
/**
 * Configurar en caso de error que se cierre para que pm2 la reinicie.
 */
process.on('uncaughtException', function (err) {
    console.log(err);
    process.exit(1);
});
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
	chalk = require('chalk');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('Party - Event Planner is running at: ' + config.port);
