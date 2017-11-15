module.exports = function(sequelize, Sequelize) {
    var Food = sequelize.define('food', {
        foodid: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        description: Sequelize.TEXT,
        type: Sequelize.INTEGER
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return Food;
}