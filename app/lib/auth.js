var jwt = require('jsonwebtoken');
var flash = require('connect-flash');

module.exports = function(app, utils) {
    function login(uid, pass, callback) {
        var model = utils.loadModel('user');
        // var where = {
        //     username: uid
        // }

        model.findAll({ where: { username: uid, password: pass } }).then((user) => {
            console.log(JSON.stringify(user));
            if (user[0] == null) {
                callback(false, 'Authentication failed. User not found.')
            }
            // var hashedPassword = bcrypt.hashSync(password, user.salt)
            //var hashedPassword = "123"
            // if (user.password === hashedPassword) {
            // else if (!user) {
            //     callback(false, 'Authentication failed. Wrong password.')
            // }
            else if (uid == user[0].username && pass == user[0].password) callback(true, 'Login success.')
                // console.log(user);

        })
    }

    function setMiddle() {
        app.use(function(req, res, next) {
            var token = req.body.token || req.query.token || req.headers['x-access-token'];
            if (token) {
                jwt.verify(token, 'secret', function(err, decoded) {
                    if (err) {
                        return res.json({ success: false, message: 'Failed to authenticate token.' });
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                });
            } else {
                return res.status(403).send({
                    success: false,
                    //message: 'No token provided.'
                });
            }
        });
    }

    function addAuth() {
        app.post('/api/auth', (req, res) => {
            login(req.body.username, req.body.password, (status, msg) => {
                if (status) {
                    var user = {
                        username: req.body.username,
                        password: req.body.password
                    }

                    var token = jwt.sign(user, 'secret', { expiresIn: 60 * 60 });
                    //res.redirect("/");
                    res.json({
                        success: true,
                        // message: 'Enjoy your token!',
                        token: token
                    });

                    //res.redirect("http://10.10.1.53:3000/#/about");
                } else {
                    return res.json({
                        success: false,
                        // message: 'No token provided'
                    });
                    //res.redirect("http://10.10.1.53:3000");
                }
            });
        })
    }
    return {

        load: function() {
            // add /post/authen
            // addAuth();
            // load midleware
            // setMiddle();
        }
    }
};