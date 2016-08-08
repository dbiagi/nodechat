module.exports = {
    db: {
        type: 'mysql',
        host: 'localhost',
        user: 'root',
        password: '123',
        name: 'nodechat'
    },
    paths: {
        models: __dirname + '/app/models',
        controllers: __dirname + '/app/controllers',
        middlewares: __dirname + '/app/middlewares',
        providers: __dirname + '/app/providers',
        tests: __dirname + '/app/tests',
        views: __dirname + '/app/views',
        public: __dirname + '/app/public',
        logs: __dirname + '/logs',
        bower: __dirname + '/bower_components',
        entities: __dirname + '/app/entities'
    },
    port: '8080'
}
