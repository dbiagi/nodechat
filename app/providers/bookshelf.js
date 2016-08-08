var app = require(__dirname + '/../../app'),
    query_builder = app.get('query_builder'),
    bookshelf = require('bookshelf')(query_builder)
    
module.exports = bookshelf