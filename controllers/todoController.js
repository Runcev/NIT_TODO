var Todo = require('../models/todoModel')

exports.todoList = function (req, res) {

    let user = req.currentUser;

    Todo.find({user: user._id})
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
    let date = req.body.date;

    // юзер у нас завжди доступний після авторизації
    let user = req.currentUser;

    var todo =new Todo({name: name, date: date, user: user});

    todo.save(function(err){
        if(err) console.log(err);
    });

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.redirect('/');
    }
};

// виводимо форму для редагування
exports.todoEdit = function (req, res) {

    let todoId = req.params.id;

    Todo.findById(todoId).exec(function (err, todo) {
        if (err) {
            if (err) console.log(err);
        }

        res.render('todo/todoEdit', {title: 'Edit todo', todo: todo});
    });
};

exports.todoUpdate = function (req, res) {

    let name = req.body.name;
    let date = req.body.date;
    
    var todo = new Todo({name: name, date: date, _id: req.params.id});

    Todo.findByIdAndUpdate(req.params.id, todo, {}, function(err,todo){
        if (err) console.log(err);

        if (req.baseUrl.match(/api/)) {
            res.send('');
        } else {
            res.redirect('/todo');
        }
    });
};

exports.todoChecked = function (req, res) {

    var todoId = req.params.id;

    Todo.findById(todoId).exec(function (err, todo) {
        if (err) {
            if (err) console.log(err);
        }

        // перемикаємо на протилежне
        var todoChange = new Todo({isDone: !todo.isDone, _id: todoId});

        Todo.findByIdAndUpdate(todoId, todoChange, {}, function(err, todoChange) {
            if (err) console.log(err);

            res.json({});
        });
    });
};

exports.todoDelete = function (req, res) {

    var todoId = req.params.id;

    Todo.findByIdAndDelete(todoId).exec(function (err, todo) {
        if (err) {
            if (err) console.log(err);
        }

        res.json({});
    });
};
