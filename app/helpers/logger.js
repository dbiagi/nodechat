var winston = require('winston'),
     consoleHandler = new (winston.transports.Console)({
        handleExceptions: true,
        humanReadableUnhandledException: true,
        level: 'error'
    }),
     errorFileHandler = new (winston.transports.File)({
        name: 'error-file',
        handleExceptions: true,
        humanReadableUnhandledException: true,
        level: 'error',
        filename: __dirname + '/../../logs/error.log',
    }),
    debugHandler = new (winston.transports.File)({
        name: 'debug-file',
        filename: __dirname + '/../../logs/debug.log',
        level: 'debug'
    }),
    logger = new (winston.Logger)({
        transports: [errorFileHandler, consoleHandler, debugHandler]
    })

module.exports = logger
