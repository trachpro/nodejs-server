module.exports = function(sequelize, Sequelize) {
    var User = sequelize.define('user', {
        userid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: Sequelize.STRING,
        username: { type: Sequelize.STRING, unique: true },
        password: Sequelize.STRING,
        phone: { type: Sequelize.STRING, unique: true },
        email: Sequelize.STRING
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return User;
}