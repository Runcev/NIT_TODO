var Event = require('../models/eventModel')

exports.eventList = function (req, res) {

    Event.find({})
        .exec(function (err, events) {
            if (err) {
                return next(err);
            }

            //console.log(JSON.stringify(users));


            if (req.baseUrl.match(/api/)) {
                res.send({ events: JSON.stringify(events) });
            } else {
                res.render('event/eventList', {title: 'Events list', events: events});
            }
        });
};

exports.eventDetail = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};

exports.eventAdd = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};

exports.eventUpdate = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};

exports.eventDelete = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};
