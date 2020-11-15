var Habit = require('../models/habitModel')

exports.habitList = function (req, res) {

    Habit.find({})
        .exec(function (err, habits) {
            if (err) {
                return next(err);
            }

            //console.log(JSON.stringify(users));


            if (req.baseUrl.match(/api/)) {
                res.send({ habits: JSON.stringify(habits) });
            } else {
                res.render('habit/habitList', {title: 'Habits list', habits: habits});
            }
        });
};

exports.habitDetail = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};

exports.habitAdd = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};

exports.habitUpdate = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};

exports.habitDelete = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};
