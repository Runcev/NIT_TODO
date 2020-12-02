var Habit = require('../models/habitModel');

exports.habitList = function (req, res) {

    let user = req.currentUser;

    Habit.find({user: user._id}).sort({isActual: -1})
        .exec(function (err, habits) {
            if (err) {
                console.log(err);
            }

            if (req.baseUrl.match(/api/)) {
                res.send({ habits: JSON.stringify(habits) });
            } else {
                res.render('habit/habitList', {title: '', habits: habits});
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
    let thisMonthTargetCount = req.body.thisMonthTargetCount;

    // юзер у нас завжди доступний після авторизації
    let user = req.currentUser;

    var habit = new Habit({name: name, user: user, isActual: true, thisMonthTargetCount: thisMonthTargetCount, thisMonthCounter: 0, counter: 0});

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
    let thisMonthTargetCount = req.body.thisMonthTargetCount;
    let isActual = (req.body.isActual == null)?false:req.body.isActual;


    var habit = new Habit({name: name, isActual: isActual, thisMonthTargetCount: thisMonthTargetCount, _id: req.params.id});

    Habit.findByIdAndUpdate(req.params.id, habit, {}, function (err, habit) {
        if (err) console.log(err);

        if (req.baseUrl.match(/api/)) {
            res.send('');
        } else {
            res.redirect('/habit');
        }
    });
};

exports.habitChecked = function (req, res) {

    var habitId = req.params.id;

    var num = req.query.num;

    Habit.findById(habitId).exec(function (err, habit) {
        if (err) {
            if (err) console.log(err);
        }

        // додаємо/або віднімаємо виконання
        let thisMonthCounter = parseInt(habit.thisMonthCounter,10) + parseInt(num, 10);
        let counter = parseInt(habit.counter, 10) + parseInt(num, 10);
        let curDate = null;

        // якщо зміниться місяць, обнулити лічильник
        let curMonth = habit.curMonth;

        if (num == 1) {
            let date = new Date();
            curDate = date.getTime();

            if (curMonth != date.getMonth()) {
                curMonth = date.getMonth();
                thisMonthCounter = 1;
            }
        }

        var habitChange = new Habit({curDate:curDate, curMonth: curMonth, thisMonthCounter: thisMonthCounter, counter: counter, _id: habitId});

        Habit.findByIdAndUpdate(habitId, habitChange, {}, function(err, habitChange) {
            if (err) console.log(err);

            res.json({});
        });
    });
};

exports.habitDelete = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};
