var Deadline = require('../models/deadlineModel');
var Entity = require('../models/entityModel');
var Color = require('../models/colorModel');

exports.deadlineList = function (req, res) {

    let user = req.currentUser;

    Deadline.find({user: user._id}).populate({path: 'entity', populate: {path: 'color'}}).sort('date')
        .exec(function(err,deadlines){
            if(err){
                console.log(err);
            }

            if (req.baseUrl.match(/api/)) {
                res.send({ deadlines : JSON.stringify(deadlines) });
            } else {
                res.render('deadline/deadlineList', {title: '', deadlines: deadlines});
            }
        });
};

exports.deadlineDetail = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};

// виводимо форму для створення нового запису
exports.deadlineAddGet = function (req, res) {

    let user = req.currentUser;
    let entityId = req.params.entityId??0;
    let backUrl = req.query.backUrl??'';

    // список всіх сутностей авторизованого юзера
    Entity.find({user: user._id}).populate('topic')
        .exec(function (err, entities) {
            if (err) console.log(err);

            res.render('deadline/deadlineAdd', {title: 'Add deadline', entities: entities, entityId: entityId, backUrl: backUrl});
        });
}

// додаємо
exports.deadlineAdd = function (req, res) {

    let name = req.body.name;
    let entity = req.body.entity;
    let date = req.body.date + 'T' + req.body.timeEnd;
    let user = req.currentUser;
    let backUrl = req.query.backUrl??'';

    var deadline = new Deadline({date: date, name: name, entity: entity, user: user});

    deadline.save(function(err){
        if(err) console.log(err);
    })

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        if (backUrl != '') {
            res.redirect('/'+backUrl);
        } else {
            res.redirect('/deadline');
        }
    }
};

// виводимо форму для редагування
exports.deadlineEdit = function (req, res) {

    let deadlineId = req.params.id;
    let backUrl = req.query.backUrl??'';

    Deadline.findById(deadlineId).exec(function (err, deadline) {
        if (err) {
            if (err) console.log(err);
        }

        let user = req.currentUser;

        // список всіх сутностей авторизованого юзера
        Entity.find({user: user._id}).populate('topic')
            .exec(function (err, entities) {
                if (err) console.log(err);

                res.render('deadline/deadlineEdit', {title: 'Edit deadline', deadline: deadline, entities: entities, backUrl: backUrl});
            });
    });
};

exports.deadlineUpdate = function (req, res) {

    let name = req.body.name;
    let entity = req.body.entity;
    let date = req.body.date + 'T' + req.body.timeEnd;
    let backUrl = req.query.backUrl??'';

    var deadline = new Deadline({date: date, name: name, entity: entity, _id: req.params.id});

    Deadline.findByIdAndUpdate(req.params.id, deadline, {}, function(err, deadline){
        if(err) console.log(err);

        if (req.baseUrl.match(/api/)) {
            res.send('');
        } else {
            if (backUrl != '') {
                res.redirect('/'+backUrl);
            } else {
                res.redirect('/deadline');
            }
        }
    });
};

exports.deadlineDelete = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};
