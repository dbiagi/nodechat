var app = require(__dirname + '/../../app'),
    bookshelf = app.get('bookshelf')

var User = bookshelf.Model.extend({
    tableName: 'user'
})

module.exports = User