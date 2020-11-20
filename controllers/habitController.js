var Habit = require('../models/habitModel')

exports.habitList = function (req, res) {

    let user = req.currentUser;

    Habit.find({user: user._id})
        .exec(function (err, habits) {
            if (err) {
                console.log(err);
            }

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

// виводимо форму для створення нового запису
exports.habitAddGet = function (req, res) {
    res.render('habit/habitAdd', {title: 'Add habit'});
}

// додаємо
exports.habitAdd = function (req, res) {

    let name = req.body.name;

    // юзер у нас завжди доступний після авторизації
    let user = req.currentUser;

    var habit = new Habit({name: name, user: user, isActual: true});

    habit.save(function (err) {

        if (err) console.log(err);
    });

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.redirect('/habit');
    }
};

// виводимо форму для редагування
exports.habitEdit = function (req, res) {

    let habitId = req.params.id;

    Habit.findById(habitId).exec(function (err, habit) {
        if (err) {
            if (err) console.log(err);
        }

        res.render('habit/habitEdit', {title: 'Edit habit', habit: habit});
    });
};

exports.habitUpdate = function (req, res) {

    let name = req.body.name;

    let isActual = (req.body.isActual == null)?false:req.body.isActual;

    var habit = new Habit({name: name, isActual: isActual, _id: req.params.id});

    Habit.findByIdAndUpdate(req.params.id, habit, {}, function (err, habit) {
        if (err) console.log(err);

        if (req.baseUrl.match(/api/)) {
            res.send('');
        } else {
            res.redirect('/habit');
        }
    });
};

exports.habitDelete = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};
