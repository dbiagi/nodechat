exports.initialize = function(http){
	var service = new ChatService(http)
	service.initialize()
}

var ChatService = function(http){
	var io = require('socket.io').listen(http)

	this.initialize = function(){
		this.registerEvents()
	}

	var registerEvents = function(){
		io.sockets.on('connection', function(socket){
			socket.on('set-user', function(data){

			})
		})
	}
}

var UserService = function(){
	this.users = [],

	this.addUser = function(id){
		this.users.push(new ChatUser(id))
	}

	this.removeUser() = function(id){

	}
}

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
