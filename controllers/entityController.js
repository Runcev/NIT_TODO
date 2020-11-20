var Entity = require('../models/entityModel')

exports.entityList = function (req, res) {

    Entity.find({})
        .exec(function (err, entities) {
            if (err) {
                return next(err);
            }

            //console.log(JSON.stringify(users));


            if (req.baseUrl.match(/api/)) {
                res.send({ entities: JSON.stringify(entities) });
            } else {
                res.render('entity/entityList', {title: 'Entities list', entities: entities});
            }
        });
};

exports.entityDetail = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};

exports.entityAdd = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler - add entity'});
    }
};

exports.entityUpdate = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};

exports.entityDelete = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler - entity delete'});
    }
};
