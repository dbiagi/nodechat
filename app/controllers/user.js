var express = require('express'),
	router  = express.Router()

router.post('/auth', function(req, res){
	var session = req.session
		model = require('../models/user'),
	    user = model.getUserBy({
		email: req.body.email
	})

	session.user = user

	res.redirect('/admin')
})

module.exports = router
