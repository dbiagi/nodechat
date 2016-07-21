//var fb = require(__dirname + '/../helpers/firebase')

var User = function(name, email){
	this.name = name
	this.email = email
}

exports.getUserById = function(id){
	return null;
}

exports.getUserBy = function(condition){
	return new User('Diego de Biagi', 'diego@invalid.com')
}
