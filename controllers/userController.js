var User = require('../models/userModel');
var md5 = require('md5');

// всі користувачі
exports.userList = function (req, res) {

    User.find({})
        .exec(function (err, users) {
            if (err) {
                return next(err);
            }

            if (req.baseUrl.match(/api/)) {
                res.send({ users: JSON.stringify(users) });
            } else {
                res.render('user/userList', {title: 'Users list', users: users});
            }
        });
};

// виводимо форму для редагування
exports.userEdit = function (req, res) {

    let user = req.currentUser;

    User.findById(user._id).exec(function (err, user) {
        if (err) {
            if (err) console.log(err);
        }

        res.render('user/userEdit', {title: 'Edit profile', user: user});
    });
};

// редагування користувача
exports.userUpdate = function (req, res) {

    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let curUser = req.currentUser;

    if (password != '') {
        var user = new User({email: email, name: name, password: md5(password), _id: curUser._id});
    } else {
        var user = new User({email: email, name: name, _id: curUser._id});
    }

    User.findByIdAndUpdate(curUser._id, user, {}, function(err, user){
        if(err) console.log(err);

        if (req.baseUrl.match(/api/)) {
            res.send('');
        } else {
            res.redirect('/');
        }
    });
};

exports.userLogout = function (req, res) {

    req.session.destroy();

    res.redirect('/');
};