var async = require('async')
var md5 = require('md5');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/nit_scheduler';
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(mongoDB);

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(db);

var User = require('./models/userModel');
var Entity = require('./models/entityModel');
var Topic = require('./models/topicModel');
var Deadline = require('./models/deadlineModel');
var Event = require('./models/eventModel');
var Todo = require('./models/todoModel');
var Habit = require('./models/habitModel');

var users = [];
var entities = [];
var topics = [];

function userCreate(name, email, password, cb) {

    var user = new User({name: name, email: email, password: md5(password)});

    user.save(function (err) {

        if (err) console.log(err);

        users.push(user);
        cb(null, true);
    });
}

function createUsers(cb) {

    console.log('users create');

    async.series([
            function (callback) {
                userCreate('Admin', 'admin@gmail.com', '123', callback);
            },
        ],
        // optional callback
        cb);
}

function deadlineCreate(name, date, entity, user, cb) {

    var deadline = new Deadline({name: name, entity: entity, user: user});

    if (date != '') {
        deadline.date = date;
    }

    deadline.save(function (err) {

        if (err) console.log(err);

        cb(null, true);
    });
}

function createDeadlines(cb) {

    console.log('deadlines create');

    async.series([
            function (callback) {
                deadlineCreate('Lab1', '2020-11-20T16:00Z', entities[0], users[0], callback);
            },
            function (callback) {
                deadlineCreate('Lab2', '2020-11-25T17:00Z', entities[0], users[0], callback);
            },
            function (callback) {
                deadlineCreate('Lab3', '2020-11-21T23:00Z', entities[1], users[0], callback);
            },
            function (callback) {
                deadlineCreate('Lab4', '2020-11-27T23:00Z', entities[1], users[0], callback);
            },
        ],
        // optional callback
        cb);
}

function entityCreate(name, user, topic, cb) {

    var entity = new Entity({name: name, user: user, topic: topic});

    entity.save(function (err) {

        if (err) console.log(err);

        entities.push(entity);

        cb(null, true);
    });
}

function createEntities(cb) {

    console.log('entities create');

    async.series([
            function (callback) {
                entityCreate('Java', users[0], topics[0], callback);
            },
            function (callback) {
                entityCreate('C++', users[0], topics[0], callback);
            },
            function (callback) {
                entityCreate('C#', users[0], topics[0], callback);
            },
            function (callback) {
                entityCreate('Swimming', users[0], topics[1], callback);
            },
        ],
        // optional callback
        cb);
}

function topicCreate(name, user, cb) {

    var topic = new Topic({name: name, user: user});

    topic.save(function (err) {

        if (err) console.log(err);

        topics.push(topic);
        cb(null, true);
    });
}

function createTopics(cb) {

    console.log('entityTypes create');

    async.series([
            function (callback) {
                topicCreate('University', users[0], callback);
            },
            function (callback) {
                topicCreate('Sport', users[0], callback);
            },
        ],
        // optional callback
        cb);
}

function eventCreate(name, date, timeStart, timeEnd, entity, user, place, about, cb) {

    var event = new Event({
        name: name, date:date, timeStart:timeStart, timeEnd:timeEnd,
        entity: entity, user: user, place:place, about: about});

    event.save(function (err) {

        if (err) console.log(err);

        cb(null, true);
    });
}

/*
    name: {type: String, required: true, trim: true},
    date: { type: Date, required: true, default: Date.now },
    timeStart: { type: String, required: true, trim: true},
    timeEnd: { type: String, required: true, trim: true},
    entity: {type: Schema.ObjectId, ref: 'Entity', required: true},
    user: {type: Schema.ObjectId, ref: 'User', required: true},
    place: {type: String, trim: true},
    about: {type: String, trim: true},
*/
function createEvents(cb) {

    console.log('events create');

    async.series([
            function (callback) {
                eventCreate('Java (lection)', '2020-11-20T08:30Z', '8:30', '10:50', entities[0], users[0], 'online', 'comment', callback);
            },
            function (callback) {
                eventCreate('Java (practice)', '2020-11-21T10:00Z', '10:00', '11:20', entities[0], users[0], 'online', 'comment', callback);
            },
            function (callback) {
                eventCreate('C++ (practice)', '2020-11-22T10:00Z', '10:00', '11:20', entities[1], users[0], 'online', 'comment', callback);
            },
            function (callback) {
                eventCreate('C++ (lection)', '2020-11-23T10:00Z', '10:00', '11:20', entities[1], users[0], 'online', 'comment', callback);
            },
        ],
        // optional callback
        cb);
}

/*
    name: {type: String, required: true, trim: true},
    user: {type: Schema.ObjectId, ref: 'User', required: true},
    // коли була додана звичка
    dateIn: { type: Date, required: true, default: Date.now},
    // актуальна чи ні
    isActual: {type: Boolean, default: true},
    thisMonthTargetCount: {type: Number, default: 0},
    thisMonthCounter: {type: Number, default: 0},
    counter: {type: Number, default: 0}
*/

function habitCreate(name, user, isActual, thisMonthTargetCount, thisMonthCounter, counter, cb) {

    var habit = new Habit({name: name, user: user, isActual: isActual, thisMonthTargetCount: thisMonthTargetCount, thisMonthCounter: thisMonthCounter, counter: counter});

    habit.save(function (err) {

        if (err) console.log(err);

        cb(null, true);
    });
}

function createHabits(cb) {

    console.log('habits create');

    async.series([
            function (callback) {
                habitCreate('Meditation', users[0], true, 15, 3, 45, callback);
            },
            function (callback) {
                habitCreate('Reading', users[0], true, 10, 7, 20, callback);
            },
        ],
        // optional callback
        cb);
}

function todoCreate(name, user, cb) {

    var todo = new Todo({name: name, user: user});

    todo.save(function (err) {

        if (err) console.log(err);

        cb(null, true);
    });
}

function createTodos(cb) {

    console.log('todos create');

    async.series([
            function (callback) {
                todoCreate('Buy coffee', users[0], callback);
            },
            function (callback) {
                todoCreate('See a good movie', users[0], callback);
            },
        ],
        // optional callback
        cb);
}

function deleteAll(cb) {
    async.series([
            function (callback) {
                Habit.deleteMany({}, () => {
                    callback(null, true)
                });
            },
            function (callback) {
                Todo.deleteMany({}, () => {
                    callback(null, true)
                });
            },
            function (callback) {
                Event.deleteMany({}, () => {
                    callback(null, true)
                });
            },
            function (callback) {
                Deadline.deleteMany({}, () => {
                    callback(null, true)
                });
            },
            function (callback) {
                Entity.deleteMany({}, () => {
                    callback(null, true)
                });
            },
            function (callback) {
                Topic.deleteMany({}, () => {
                    callback(null, true)
                });
            },
            function (callback) {
                User.deleteMany({}, () => {
                    callback(null, true)
                });
            },
        ],
        cb
    );
}

async.series([
        deleteAll,
        createUsers,
        createTopics,
        createEntities,
        createEvents,
        createTodos,
        createHabits,
        createDeadlines,
    ],
// Optional callback
    function (error, results) {

        // All done, disconnect from database
        mongoose.connection.close();
    });