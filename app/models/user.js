var app = require(__dirname + '/../../app'),
	db = app.get('db'),
	_ = require('lodash')

var User = function(data){
	this.id = 0
	this.name = ''
	this.email = ''
	this.password = ''
	this.active = false

	this.hydratate = function(data){
		this.id = data.id
		this.password = data.password
		this.name = data.name
		this.email = data.email
		this.active = data.active
	}

	if(data){
		this.hydratate(data)
	}
}

exports.getUserById = function(id, callback){
	db.query('SELECT * FROM user WHERE id = ?', [id], function(err, rows){
		callback(err, new User(rows[0]))
	})
}

exports.getUserByEmail = function(email, callback){

	db.query('SELECT * FROM user WHERE email = ?', email, function(err, rows){
		if(rows.length < 1){
			callback(err = {
				code: 'user_not_found',
				message: 'User not found'
			}, null)

			return
		}

		callback(err, new User(rows[0]))
	})
}
