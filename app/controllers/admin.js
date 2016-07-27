var express = require('express'),
    router = express.Router()

router.get('/', function(req, res){  
    res.render('admin', {
        user: req.session.user
    })
})

module.exports = router
