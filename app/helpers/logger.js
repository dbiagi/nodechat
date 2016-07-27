var winston = require('winston'),
 	errorHandler = new (winston.transports.Console)({
		handleExceptions: true,
		humanReadableUnhandledException: true,
		level: 'error'
	}),
	debugHandler = new (winston.transports.File)({
		filename: __dirname + '/../../debug.log',
		level: 'debug'
	}),
	logger = new (winston.Logger)({
		transports: [errorHandler, debugHandler]
	})

module.exports = logger
