var express = require('express'),
	router = express.Router(),
	userModel = require(__dirname + '/../models/user'),
	chat = require(__dirname + '/../modules/chat'),
	app = require(__dirname + '/../../app')

router.get('/', function(req, res){
	var session = req.session

	chat.initialize(app.get('http'))
	
	res.render('admin', {
		user: req.session.user
	})

})

module.exports = router
