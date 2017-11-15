module.exports = function(food_model) {
    return {
        list: (req, res) => {
            var page = req.params.page ? parseInt(req.params.page) : 1;
            var limit = req.params.limit ? parseInt(req.params.limit) : 100;
            if (page < 1) page = 1;
            if (limit < 1 || limit > 200) limit = 10;
            food_model.findAll({ offset: (page - 1) * limit, limit: limit }).then((datas) => {
                res.json(datas || [])
            });
        },
        search: (req, res) => {
            var page = req.body.page ? parseInt(req.body.page) : 1;
            var limit = req.body.limit ? parseInt(req.body.limit) : 10;
            if (page < 1) page = 1;
            if (limit < 1 || limit > 20) limit = 10;

            var cond = {}
            if (req.body.name) cond.name = req.body.name;
            if (req.body.price) cond.price = parseInt(req.body.price);
            if (req.body.type) cond.type = req.body.type;

            food_model.findAll({ offset: (page - 1) * limit, limit: limit, where: cond }).then((datas) => {
                res.json(datas || [])
            });
        },
        get: (req, res) => {
            const id = req.params.id;
            food_model.findById(id).then((data) => {
                res.json({ "status": "200", "message": "successful", "data": data.dataValues });
            });
        },
        insert: (req, res) => {
            console.log(req)
            food_model.create({
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                type: req.body.type
            }).then((data) => {
                console.log("success ", data);
                res.json({ "status": "200", "message": "1 row(s) inserted", "data": data.dataValues });
            });
        },
        update: (req, res) => {
            var value = {
                id: req.params.id,
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                type: req.body.type
            };
            food_model.update(value, { where: { foodid: value.id } })
                .then((row) => {
                    if (row > 0) {
                        res.json({ "status": "200", "message": row + " row(s) updated", "data": value });
                    } else {
                        res.json({ "status": "200", "message": row + " row(s) updated" });
                    }
                });
        },
        delete: (req, res) => {
            food_model.destroy({
                    where: { foodid: req.params.id }
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