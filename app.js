var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    config = require(__dirname + '/app/config.json'),
    cookieSession = require('cookie-session'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    socket = require(__dirname + '/app/modules/socket.js')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    maxAge: 64000
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/app/public'))
app.use('/lib', express.static(__dirname + '/bower_components'))
app.use(require(__dirname + '/app/middlewares'))
app.use(require(__dirname + '/app/controllers'))

app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');
app.set('port', config.port)

socket.initialize(http)

http.listen(app.get('port'), function () {
    console.log('listening on *:' + app.get('port'))
})
