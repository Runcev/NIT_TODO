var express = require('express');
var app = express();
var createError = require('http-errors');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var md5 = require('md5');

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

app.use(session({
    secret: '123123@3*&%#$#hkn',
    resave: false,
    saveUninitialized: true
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.json());
//app.use(express.urlencoded({extended: true}));

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// авторизація
var userId = function (req, res, next) {
/*
    // тимчасова "заглушка", щоб реєстрацію не питало кожен раз :)
    var User = require('./models/userModel');

    User.findOne({email: 'admin@gmail.com'}).exec(function (err, user) {
        // в req.currentUser - авторизований юзер
        req.currentUser = user;
        next();
        });
*/
    // юзер авторизований
    if (req.session.currentUser) {
        req.currentUser = req.session.currentUser;
        res.locals.userLogin = 1;
        next();

        // переадресовуємо на форму авторизації
    } else if (!req.url.match(/user\/(login|add)$/)) {
        if (req.url.match(/api/)) {
            res.send('');
        } else {
            res.render('user/userLogin', {title: 'Login'});
        }

        // реєструємось
    } else if (req.url.match(/user\/add$/)) {


        let name = req.body.name??'';
        let email = req.body.email??'';
        let password = req.body.password??'';

        if (email != '' && email != '' && password != '') {

            var User = require('./models/userModel');

            User.findOne({email: email}).exec(function (err, user) {
                // такий юзер існує
                if (user) {
                    res.render('user/userAdd', {title: 'Registration', error: true});
                } else {
                    var user = new User({name: name, email: email, password: md5(password)});

                    user.save(function (err) {
                        if (err) {
                            if (req.baseUrl.match(/api/)) {
                                res.send('User not added');
                            } else {
                                res.redirect('/');
                            }
                        } else {
                            if (req.baseUrl.match(/api/)) {
                                res.send('User added: ' + req.body.name + '/' + req.body.email);
                            } else {
                                res.redirect('/');
                            }
                        }
                    });
                }
            });

            // форма реєстрації
        } else {
            if (req.url.match(/api/)) {
                res.send('');
            } else {
                res.render('user/userAdd', {title: 'Registration'});
            }
        }

        // авторизуємось
    } else if (req.url.match(/user\/login$/)) {
        let email = req.body.email??'';
        let password = req.body.password??'';

        var User = require('./models/userModel');

        User.findOne({email: email, password: md5(password)}).exec(function (err, user) {
            // в currentUser - авторизований юзер
            if (user) {
                if (req.baseUrl.match(/api/)) {
                    res.send('');
                } else {
                    req.session.currentUser = user;
                    res.redirect('/');
                }
            } else {
                if (req.baseUrl.match(/api/)) {
                    res.send('');
                } else {
                    res.render('user/userLogin', {title: 'Login', error: true});
                }
            }
        });
    }
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
var deadlineRouter = require('./routes/deadlineRouter');

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
app.use('/deadline', deadlineRouter);
app.use('/api/deadline', deadlineRouter);
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