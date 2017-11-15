module.exports = function(sequelize, Sequelize) {
    var OrderDetail = sequelize.define('orderdetail', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        orderid: Sequelize.INTEGER,
        foodid: Sequelize.INTEGER,
        quantity: Sequelize.INTEGER
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return OrderDetail;
}