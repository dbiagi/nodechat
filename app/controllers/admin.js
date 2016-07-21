var express = require('express'),
	router = express.Router()

router.get('/', function(req, res){
	var session = req.session
	
	res.render('admin', {
		user: req.session.user
	})
})

module.exports = router
