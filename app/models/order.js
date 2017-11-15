module.exports = function(sequelize, Sequelize) {
    var Order = sequelize.define('order', {
        orderid: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userid: Sequelize.INTEGER,
        date: Sequelize.TIME,
        bill: Sequelize.INTEGER
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return Order;
}