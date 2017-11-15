module.exports = function(order_model) {
    return {
        list: (req, res) => {
            var page = req.params.page ? parseInt(req.params.page) : 1;
            var limit = req.params.limit ? parseInt(req.params.limit) : 10;
            if (page < 1) page = 1;
            if (limit < 1 || limit > 20) limit = 10;
            order_model.findAll({ offset: (page - 1) * limit, limit: limit }).then((datas) => {
                res.json(datas || [])
            });
        },
        search: (req, res) => {
            var page = req.body.page ? parseInt(req.body.page) : 1;
            var limit = req.body.limit ? parseInt(req.body.limit) : 10;
            if (page < 1) page = 1;
            if (limit < 1 || limit > 20) limit = 10;

            var cond = {}
            if (req.body.orderid) cond.orderid = parseInt(req.body.orderid);
            if (req.body.userid) cond.userid = parseInt(req.body.userid);
            if (req.body.date) cond.date = req.body.date;
            if (req.body.bill) cond.bill = parseInt(req.body.bill);

            order_model.findAll({ offset: (page - 1) * limit, limit: limit, where: cond }).then((datas) => {
                res.json(datas || [])
            });
        },
        get: (req, res) => {
            // const id = req.params.id;
            order_model.findAll().then((data) => {
                res.json({ "status": "200", "message": "successful", "data": data.dataValues });
            });
        },
        insert: (req, res) => {
            console.log(req);
            order_model.create({
                orderid: req.body.orderid,
                userid: req.body.userid,
                date: req.body.date,
                bill: req.body.bill
            }).then((data) => {
                console.log("success ", data);
                res.json({ "status": "200", "message": "1 row(s) inserted", "data": data.dataValues });
            });
        },
        update: (req, res) => {
            var value = {
                orderid: req.params.id,
                userid: req.body.userid,
                date: req.body.date,
                bill: req.body.bill
            };
            order_model.update(value, { where: { orderid: value.orderid } })
                .then((row) => {
                    if (row > 0) {
                        res.json({ "status": "200", "message": row + " row(s) updated", "data": value });
                    } else {
                        res.json({ "status": "200", "message": row + " row(s) updated" });
                    }
                });
        },
        delete: (req, res) => {
            order_model.destroy({
                    where: { orderid: req.params.id }
                })
                .then(rows => {
                    if (rows > 0)
                        res.json({ "status": "200", "message": rows + " row(s) affected" });
                    else
                        res.json({ "status": "300", "message": rows + " row(s) affected" });
                });
        }
    }
}