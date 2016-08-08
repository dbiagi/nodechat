var app = require(__dirname + '/../../app'),
    logger = app.get('logger'),
    _ = require('lodash'),
    config = app.get('config')

var ChatService = function (http) {
    var io = require('socket.io')(http),
        userModel = require(config.paths.models + '/user'),
        sockets = []

    this.initialize = function () {
        io.use(authorization)
        registerConnectionEvents()
    }

    var registerConnectionEvents = function () {
        io.sockets.on('connection', function (socket) {
            registerChatEvents(socket)
            updateRooms(socket)
        })
    }

    var registerChatEvents = function (socket) {
        socket
            .on('disconnect', function () {
                onDisconnect(socket)
            })
            .on('message', function(data){
                onMessage(socket, data)
            })
            .on('create-room', function(data){
                onCreateRoom(socket, data)
            })
    }

    var authorization = function (socket, next) {
        var id = socket.handshake.query.id

        userModel.getUserById(id, function (err, user) {
            if (err) {
                logger.error('User not found with id: %d', id)
                next(err.message || '', false)
                return
            }

            // Set the socket user
            socket.user = user

            // Add socket to the sockets list
            sockets.push(socket)
            
            // Continue the flow
            next(null, true)
        })
    }
    
    var updateRooms = function(socket){        
        io.to(socket.id).emit('update-users-list', {
            users: sockets.map(_.property('user'))
        })
    }

    var onMessage = function (socket, data) {
        socket.broadcast.emit('message', data)
    }

    var onCreateRoom = function (socket, data) {
        
    }

    var onDisconnect = function (socket) {
        logger.debug('User %s has disconnected.', socket.user.name)
        
        // Avisa a todos os usuários que está desconectando
        socket.broadcast.emit('user-leave', { user: socket.user })
        
        // Remove socket da lista de sockets
        _.remove(sockets, function (s) {
            return s.user.id == socket.user.id
        })
    }
}

var Protocol = function(){
    this.CONNECTION = 'connection'
}

exports.initialize = function (http) {
    var service = new ChatService(http)
    service.initialize()
}
