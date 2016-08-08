var express = require('express'),
    router  = express.Router(),
    app = require(__dirname + '/../../app'),
    config = app.get('config')

router.post('/auth', function(req, res){
    var session = req.session,
        model = require(config.paths.models + '/user')

    var user = model.getUserByEmail(req.body.email, function(err, user){
        if(!user){
            session.error = 'User not found'
            res.redirect('/')
            return
        } else if(user.password != req.body.password){
            session.error = 'Wrong password'
            res.redirect('/')
            return
        }

        session.user = user
        res.redirect('/admin')
    })

})

module.exports = router
