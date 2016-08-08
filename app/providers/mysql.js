var mysql = require('mysql'),
    app = require(__dirname + '/../../app.js'),
    logger = app.get('logger'),
    config = app.get('config').db

var conn = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.name
})

conn.connect(function(err){
    if(err){
        logger.error('Cannot connected to database %s on %s with user %s', config.db, config.host, config.user)
        process.exit(1)
    }
})

module.exports = conn
