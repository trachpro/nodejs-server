var Sequelize = require('sequelize')
    , sequelize = new Sequelize('testdb', 'root', '', {
        dialect: "mysql",
        port: 8889,
    });

/**
 * Test Connection
 */
// sequelize
//   .authenticate()
//   .then(function(err) {
//     console.log('Connection has been established successfully.');
//   }, function (err) { 
//     console.log('Unable to connect to the database:', err);
//   });
var user_model = require('./app/models/User')(sequelize, Sequelize);
for (var i = 0; i < 100; i++) {
    user_model.create({
        name: "hoang " + i,
        age: i,
        email: "hoang " + i + "@gmail.com"
    }).then((data) => {
        console.log(i+ " success");
    });

}
