var express = require('express');
var app = express();
var createError = require('http-errors');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// модуль для керування асинхронними діями
var async = require('async');

// підключаемось до БД
var mongoDB = 'mongodb://127.0.0.1:27017/nit_scheduler';

// для роботи з MongoDB
var mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

mongoose.connect(mongoDB);
// Mongoose використовує глобальну бібліотеку промісів
mongoose.Promise = global.Promise;

// отримання підключення за замовчуванням
var db = mongoose.connection;
// отримувати повідомлення про помилки підключення
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// модуль, який дозволить робити унікальні числові _id для колекцій в БД
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(db);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.json());
//app.use(express.urlencoded({extended: true}));

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// тут буде якась авторизація потім :)
var userId = function (req, res, next) {
    var User = require('./models/userModel');

    User.find({email: 'admin@gmail.com'}).exec(function (err, user) {
        // в req.userId - авторизований юзер
        req.userId = user;
        next();
    });
}

app.use(userId);

// маршрути ----------------------------------------
var indexRouter = require('./routes/indexRouter');
var userRouter = require('./routes/userRouter');
var eventRouter = require('./routes/eventRouter');
var habitRouter = require('./routes/habitRouter');
var topicRouter = require('./routes/topicRouter');
var todoRouter = require('./routes/todoRouter');
var entityRouter = require('./routes/entityRouter');

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/api/user', userRouter);
app.use('/event', eventRouter);
app.use('/api/event', eventRouter);
app.use('/habit', habitRouter);
app.use('/api/habit', habitRouter);
app.use('/topic', topicRouter);
app.use('/api/topic', topicRouter);
app.use('/todo', todoRouter);
app.use('/api/todo', todoRouter);
app.use('/entity', entityRouter);
app.use('/api/entity', entityRouter);
// -------------------------------------------------

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;