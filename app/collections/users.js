var app = require(__dirname + '/../../app'),
    bookshelf = app.get('bookshelf'),
    User = require('../entities/user')

var Users = bookshelf.Collection.extend({
    model: User
})

module.exports = Users