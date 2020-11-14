var User = require('../models/userModel')

// всі користувачі
exports.userList = function (req, res) {

    User.find({})
        .exec(function (err, users) {
            if (err) {
                return next(err);
            }

            //console.log(JSON.stringify(users));


            if (req.baseUrl.match(/api/)) {
                res.send({ users: JSON.stringify(users) });
            } else {
                res.render('user/userList', {title: 'Users list', users: users});
            }
        });
};

// інфо про користувача
exports.userDetail = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler - info about user'});
    }
};

// додаємо користувача
exports.userAdd = function (req, res) {

    let name = req.body.name;
    let email = req.body.email??'';

    var user = new User({name: name, email: email});

    user.save();

    if (req.baseUrl.match(/api/)) {
        res.send('User added: ' + req.body.name + '/' + req.body.email);
    } else {
        res.render('index', {title: 'Scheduler - user added'});
    }
};

// редагування користувача
exports.userUpdate = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler - update user'});
    }
};

// авторизація користувача
exports.userLogin = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};