module.exports = function(user_model) {
    return {
        list: (req, res) => {
            var page = req.params.page ? parseInt(req.params.page) : 1;
            var limit = req.params.limit ? parseInt(req.params.limit) : 10;
            if (page < 1) page = 1;
            if (limit < 1 || limit > 20) limit = 10;
            user_model.findAll({ offset: (page - 1) * limit, limit: limit }).then((datas) => {
                res.json(datas || [])
            });
        },

        search: (req, res) => {
            var page = req.body.page ? parseInt(req.body.page) : 1;
            var limit = req.body.limit ? parseInt(req.body.limit) : 10;
            if (page < 1) page = 1;
            if (limit < 1 || limit > 20) limit = 10;

            var cond = {}
            if (req.body.username) cond.username = req.body.username;
            //if (req.body.age) cond.age = parseInt(req.body.age);
            if (req.body.password) cond.password = req.body.password;

            user_model.findAll({ where: datas = cond }).then((datas) => {
                //                res.json(datas || [])
                if (datas == "") res.redirect("http://192.168.1.6:3000");
                else res.redirect("http://192.168.1.6:3000/#/about");
            });
        },
        get: (req, res) => {
            const id = req.params.id;
            user_model.findById(id).then((data) => {
                res.json({ "status": "200", "message": "successful", "data": data.dataValues });
            });
        },


        insert: (req, res) => {
            console.log(req)
            console.log(req.name);

            user_model.create({
                    name: req.body.name,
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    phone: req.body.phone,
                }).then((data) => {
                    console.log("success ", data);
                    // req.flash('success_msg', 'You are registered and can now login');
                    //  res.redirect('http://192.168.100.16:3000');
                    //res.json({ "status": "200", "message": "1 row(s) inserted", "data": data.dataValues });
                    return res.json('You are registered and can now login');

                })
                .then((err) => {
                    if (err) console.log(err);
                    return res.json('Register failed');
                });

        },
        update: (req, res) => {
            var value = {
                id: req.params.id,
                name: req.body.name,
                age: req.body.age,
                email: req.body.email
            };
            user_model.update(value, { where: { id: value.id } })
                .then((row) => {
                    if (row > 0) {
                        res.json({ "status": "200", "message": row + " row(s) updated", "data": value });
                    } else {
                        res.json({ "status": "200", "message": row + " row(s) updated" });
                    }
                });
        },
        delete: (req, res) => {
            user_model.destroy({
                    where: { userid: req.params.id }
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