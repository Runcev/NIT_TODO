var Topic = require('../models/topicModel')

exports.topicList = function (req, res) {

    let user = req.currentUser;

    Topic.find({user: user._id})
    .exec(function (err, topics) {
        if (err) {
            console.log(err);
        }

        if (req.baseUrl.match(/api/)) {
            res.send({ topics: JSON.stringify(topics) });
        } else {
            res.render('topic/topicList', {title: 'Topics list', topics: topics});
        }
    });
};

exports.topicEventsList = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};

exports.topicDetail = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};

// виводимо форму для створення нового запису
exports.topicAddGet = function (req, res) {
    res.render('topic/topicAdd', {title: 'Add topic'});
}

exports.topicAdd = function (req, res) {

    let name = req.body.name;

    // юзер у нас завжди доступний після авторизації
    let user = req.currentUser;

    var topic = new Topic({name: name, user: user});

    topic.save(function(err){
        if(err) console.log.err;
    });

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.redirect('/topic');
    }
};

// виводимо форму для редагування
exports.topicEdit = function (req, res) {

    let topicId = req.params.id;

    Topic.findById(topicId).exec(function (err, topic) {
        if (err) {
            if (err) console.log(err);
        }

        res.render('topic/topicEdit', {title: 'Edit topic', topic: topic});
    });
};

exports.topicUpdate = function (req, res) {
    
    let name = req.body.name;

    // юзер у нас завжди доступний після авторизації
    let user = req.currentUser;

    var topic = new Topic({name: name, user: user, _id: req.params.id});

    Topic.findByIdAndUpdate(req.params.id, topic, {}, function(err,topic){
        if(err) console.log(err);

        if (req.baseUrl.match(/api/)) {
            res.send('');
        } else {
            res.redirect('/topic');
        }
    });
};

exports.topicDelete = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};
