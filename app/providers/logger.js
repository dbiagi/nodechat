var app = require(__dirname + '/../../app'),
    config = app.get('config'),
    
    winston = require('winston'),
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
        filename: config.paths.logs + '/log.log'
    }),
    debugHandler = new (winston.transports.File)({
        name: 'debug-file',
        filename: config.paths.logs + '/debug.log',
        level: 'debug'
    }),
    logger = new (winston.Logger)({
        transports: [errorFileHandler, consoleHandler, debugHandler]
    })

module.exports = logger
