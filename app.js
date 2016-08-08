var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    config = require('./config'),
    path = config.paths,
    session = require('express-session'),
    bodyParser = require('body-parser')

module.exports = app

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    maxAge: 64000
}))

app.set('config', config)
app.set('views', path.views);
app.set('view engine', 'jade');
app.set('port', config.port)
app.set('logger', require(path.providers + '/logger'))
app.set('db', require(path.providers + '/mysql'))
app.set('query_builder', require(path.providers + '/query_builder'))
app.set('bookshelf', require(path.providers + '/bookshelf'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.public))
app.use('/lib', express.static(path.bower))
app.use(require(path.middlewares))
app.use(require(path.controllers))

require(path.providers + '/chat').initialize(http)

http.listen(app.get('port'), function () {
    console.log('listening on *:' + app.get('port'))
})
