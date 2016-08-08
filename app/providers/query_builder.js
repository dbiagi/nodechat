var app = require(__dirname + '/../../app'),
    config = app.get('config').db

module.exports = require('knex')({
    client: 'mysql',
    connection: {
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.name,
        charset: 'utf8'
    }
})