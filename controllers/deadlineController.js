
var Deadline = require('../models/deadlineModel')

exports.deadlineList = function (req, res) {

    Deadline.find({})
        .exec(function(err,deadlines){
            if(err){
                console.log(err);
            }

            if (req.baseUrl.match(/api/)) {
                res.send({ deadlines : JSON.stringify(deadlines) });
            } else {
                res.render('deadline/deadlineList', {title: 'Deadline list', deadlines: deadlines});
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
    res.render('deadline/deadlineAdd', {title: 'Add deadline'});
}

// додаємо
exports.deadlineAdd = function (req, res) {

    let name = req.body.name;
    let entity = req.entity;
    let date = req.date;

    var deadline = new Deadline({date: date,name: name, entity: entity});

    deadline.save(function(err){
        if(err) console.log(err);
    })

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.redirect('/deadline'); 
    }
};

exports.deadlineUpdate = function (req, res) {

    let name = req.body.name;
    let entity = req.entity;
    let date = req.date;

    var deadline = new Deadline({date: date,name: name, entity: entity});

    Deadline.findByIdAndUpdate(req.params.id, deadline, {}, function(err, deadline){
        if(err) console.log(err);

        if (req.baseUrl.match(/api/)) {
            res.send('');
        } else {
            res.redirect('/deadline'); 
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
