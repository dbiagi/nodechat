var express = require('express'),
    router = express.Router()

router.use('/user', require('./user'))
router.use('/admin', require('./admin'))

router.get('/', function(req,res){
    if(req.session.user){
        res.redirect('/admin')
        return
    }

    res.render('login/index')
})

router.get('/test', function(response, request){
    var users = require('../collections/users')
    console.log(users.query());
})

module.exports = router
