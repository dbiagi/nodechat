var express = require('express'),
    router = express.Router()

router.all('/admin', function(req, res, next){
    var session = req.session

    if(!session.user){
        res.redirect('/')
        return;
    }

    next(null, true)
})

module.exports = router
