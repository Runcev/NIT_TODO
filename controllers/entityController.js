var Entity = require('../models/entityModel');
var Topic = require('../models/topicModel');

exports.entityList = function (req, res) {

    let user = req.currentUser;

    Entity.find({user: user._id}).populate('topic')
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

// виводимо форму для створення нового запису
exports.entityAddGet = function (req, res) {

    let user = req.currentUser;

    // список всіх topics авторизованого юзера
    Topic.find({user: user._id})
        .exec(function (err, topics) {
            if (err) console.log(err);

            res.render('entity/entityAdd', {title: 'Add entity', topics: topics});
        });
}

exports.entityAdd = function (req, res) {

    let name = req.body.name;
    let topic = req.body.topic;
    let user = req.currentUser;

    var entity = new Entity({name: name, topic: topic, user: user});

    entity.save(function(err){
        if(err) console.log(err);
    })

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.redirect('/entity');
    }
};

// виводимо форму для редагування
exports.entityEdit = function (req, res) {

    let entityId = req.params.id;

    Entity.findById(entityId).exec(function (err, entity) {
        if (err) {
            if (err) console.log(err);
        }

        let user = req.currentUser;

        // список всіх topics авторизованого юзера
        Topic.find({user: user._id})
            .exec(function (err, topics) {
                if (err) console.log(err);

                res.render('entity/entityEdit', {title: 'Edit entity', entity: entity, topics: topics});
            });
    });
};

exports.entityUpdate = function (req, res) {

    let name = req.body.name;
    let topic = req.body.topic;

    var entity = new Entity({name: name, topic: topic, _id: req.params.id});

    Entity.findByIdAndUpdate(req.params.id, entity, {}, function(err, entity){
        if(err) console.log(err);

        if (req.baseUrl.match(/api/)) {
            res.send('');
        } else {
            res.redirect('/entity');
        }
    });
};

exports.entityDelete = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler - entity delete'});
    }
};
