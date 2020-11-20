var Event = require('../models/eventModel')
var Entity = require('../models/entityModel')
var Topic = require('../models/topicModel')

exports.eventList = function (req, res) {

    let user = req.currentUser;

    Event.find({user: user._id}).populate({path: 'entity', populate: {path: 'topic'}})
        .exec(function (err, events) {
            if (err) console.log(err);

            if (req.baseUrl.match(/api/)) {
                res.send({events: JSON.stringify(events)});
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

// виводимо форму для створення нового запису
exports.eventAddGet = function (req, res) {

    let user = req.currentUser;

    // список всіх сутностей авторизованого юзера
    Entity.find({user: user._id}).populate('topic')
        .exec(function (err, entities) {
            if (err) console.log(err);

            res.render('event/eventAdd', {title: 'Add event', entities: entities});
        });
}

// додаємо
exports.eventAdd = function (req, res) {

    let name = req.body.name;
    let date = req.body.date;
    let timeStart = req.body.timeStart;
    let timeEnd = req.body.timeEnd;
    let entity = req.body.entity;
    let place = req.body.place;
    let about = req.body.about;

    // юзер у нас завжди доступний після авторизації
    let user = req.currentUser;

    var event = new Event({name: name, user: user._id, date: date, timeStart: timeStart, timeEnd: timeEnd, entity: entity, place: place, about: about});

    event.save(function (err) {

        if (err) console.log(err);
    });

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.redirect('/event');
    }
};

// виводимо форму для редагування
exports.eventEdit = function (req, res) {

    let eventId = req.params.id;

    Event.findById(eventId).exec(function (err, event) {
        if (err) {
            if (err) console.log(err);
        }

        let user = req.currentUser;

        // список всіх сутностей авторизованого юзера
        Entity.find({user: user._id}).populate('topic')
            .exec(function (err, entities) {
                if (err) console.log(err);

                res.render('event/eventEdit', {title: 'Edit event', event: event, entities: entities});
            });
    });
};

exports.eventUpdate = function (req, res) {

    let name = req.body.name;
    let date = req.body.date;
    let timeStart = req.body.timeStart;
    let timeEnd = req.body.timeEnd;
    let entity = req.body.entity;
    let place = req.body.place;
    let about = req.body.about;

    var event = new Event({_id: req.params.id, name: name, date: date, timeStart: timeStart, timeEnd: timeEnd, entity: entity, place: place, about: about});

    Event.findByIdAndUpdate(req.params.id, event, {}, function (err, event) {
        if (err) console.log(err);

        if (req.baseUrl.match(/api/)) {
            res.send('');
        } else {
            res.redirect('/event');
        }
    });
};

exports.eventDelete = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};
