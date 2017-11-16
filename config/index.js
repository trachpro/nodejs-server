var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development',
    port = 8000

var config = {
    development: {
        root: rootPath,
        secret: 'test',
        app: {
            name: 'rest-api-template'
        },
        port: port,
        dialect: 'mysql',
        db: 'sql12205387',
        db_port: 3306,
        user: 'sql12205387',
        pass: 'TunV1ksnaI'
    },

    production: {
        root: rootPath,
        secret: 'test',
        app: {
            name: 'rest-api-template'
        },
        port: port,
        dialect: 'mysql',
        db: 'sql12205387',
        db_port: 3306,
        user: 'sql12205387',
        pass: 'TunV1ksnaI'
    }
};

module.exports = config[env];