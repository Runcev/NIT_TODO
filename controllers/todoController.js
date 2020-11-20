var Todo = require('../models/todoModel')

exports.todoList = function (req, res) {

    Todo.find({})
    .exec(function (err, todos) {
        if (err) {
            console.log(err);
        }

        if (req.baseUrl.match(/api/)) {
            res.send({ todos: JSON.stringify(todos) });
        } else {
            res.render('todo/todoList', {title: 'Todos list', todos: todos});
        }
    });
};

exports.todoDetail = function (req, res) {
    // TODO
    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};

// виводимо форму для створення нового запису
exports.todoAddGet = function (req, res) {
    res.render('todo/todoAdd', {title: 'Add todo'});
}

exports.todoAdd = function (req, res) {

    let name = req.body.name;

    // юзер у нас завжди доступний після авторизації
    let user = req.currentUser;

    var todo =new Todo({name: name, user: user});

    todo.save(function(err){
        if(err) console.log(err);
    });

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.redirect('/todo');
    }
};

exports.todoUpdate = function (req, res) {

    let name = req.body.name;
    
    var todo = new Todo({name: name, _id: req.params.id});

    Todo.findByIdAndUpdate(req.params.id, todo, {}, function(err,todo){
        if (err) console.log(err);

        if (req.baseUrl.match(/api/)) {
            res.send('');
        } else {
            res.redirect('/todo');
        }
    });
};

exports.todoDelete = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};
