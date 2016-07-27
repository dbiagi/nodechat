var mysql = require('mysql'),
	app = require(__dirname + '/../../app.js'),
	logger = app.get('logger'),
	config = app.get('config').mysql


var conn = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.db
})


conn.connect(function(err){
	if(err){
		logger.error('Cannot connected to database %s on %s with user %s', config.db, config.host, config)
	}
})

module.exports = conn
