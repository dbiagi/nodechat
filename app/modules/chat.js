var app = require(__dirname + '/../../app'),
	logger = app.get('logger'),
	_ = require('lodash')

var ChatService = function(http){
	var io = require('socket.io').listen(http),
		userService = new UserService()

	this.initialize = function(){
		io.use(authorization)
		registerConnectionEvents()
	}

	var registerConnectionEvents = function(){
		io.sockets.on('connection', function(socket){
			logger.debug('User connected')
		})
	}

	var registerChatEvents = function(socket){

	}

	var authorization = function(socket, next){
		userService.addUser(socket.handshake.query.id, socket, function(err){
			if(err){
				next(err.message, false)
				return
			}

			next(null, true)
		})
	}
}

var UserService = function(){
	var userModel = require('../models/user'),
		users = []

	this.addUser = function(id, socket, callback){
		userModel.getUserById(id, function(err, user){
			if(err){
				logger.error('User not found with id: %d', id)
				callback(err)
				return
			}

			users.push({
				user: user,
				socket: socket
			})
		})
	}

	this.removeUser = function(id){
		_.remove(users, function(u){
			return u.id == id
		})
	}

	Object.defineProperties(this, {
		'users': {
			enumerable: true,
			get: function(){
				return users
			}
		}
	})
}
/*
var ChatUser = function(id){
	var _id = id,
		_name = 'tes',
		_email = 'teste@teste.com',
		_socket = null

	Object.defineProperties(this, {
		"id": {
			enumerable: true,
			get: function(){
				return _id
			},
		},
		"name": {
			enumerable: true,
			get: function(){
				return _name
			},
			set: function(value){
				_name = value
			}
		},
		"email": {
			enumerable: true,
			get: function(){
				return _email
			},
			set: function(value){
				_email = value
			}
		},
		"socket": {
			enumerable: true,
			get: function(){
				return _socket
			},
			set: function(value){
				_socket = value
			}
		}
	})
}
*/
exports.initialize = function(http){
	var service = new ChatService(http)
	service.initialize()
}
