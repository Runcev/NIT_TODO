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
var Color = require('./models/colorModel');

var users = [];
var entities = [];
var topics = [];
var colors = [];

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
                deadlineCreate('Lab1', '2020-12-05T16:00', entities[0], users[0], callback);
            },
            function (callback) {
                deadlineCreate('Lab2', '2020-12-07T17:00', entities[0], users[0], callback);
            },
            function (callback) {
                deadlineCreate('Lab3', '2020-12-04T23:00', entities[1], users[0], callback);
            },
            function (callback) {
                deadlineCreate('Lab4', '2020-12-06T23:00', entities[1], users[0], callback);
            },
            function (callback) {
                deadlineCreate('Lab5', '2020-12-01T16:00', entities[2], users[0], callback);
            },
            function (callback) {
                deadlineCreate('Lab6', '2020-12-03T17:00', entities[2], users[0], callback);
            },
            function (callback) {
                deadlineCreate('Lab7', '2020-12-09T23:00', entities[3], users[0], callback);
            },
            function (callback) {
                deadlineCreate('Lab8', '2020-12-12T23:00', entities[3], users[0], callback);
            },
        ],
        // optional callback
        cb);
}

function entityCreate(name, user, topic, color, cb) {

    var entity = new Entity({name: name, user: user, topic: topic, color: color});

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
                entityCreate('Java', users[0], topics[0], colors[0], callback);
            },
            function (callback) {
                entityCreate('C++', users[0], topics[0], colors[7], callback);
            },
            function (callback) {
                entityCreate('C#', users[0], topics[0], colors[9], callback);
            },
            function (callback) {
                entityCreate('JavaScript', users[0], topics[0], colors[1], callback);
            },
            function (callback) {
                entityCreate('Haskell', users[0], topics[0], colors[10], callback);
            },
            function (callback) {
                entityCreate('Mobile Dev', users[0], topics[0], colors[2], callback);
            },
            function (callback) {
                entityCreate('Math', users[0], topics[0], colors[12], callback);
            },
            function (callback) {
                entityCreate('DataBases', users[0], topics[0], colors[5], callback);
            },
            function (callback) {
                entityCreate('Artificial Intelligence', users[0], topics[0], colors[8], callback);
            },
            function (callback) {
                entityCreate('Swimming', users[0], topics[1], colors[11], callback);
            },
            function (callback) {
                entityCreate('Tennis', users[0], topics[1], colors[3], callback);
            },
            function (callback) {
                entityCreate('Volleyball', users[0], topics[1], colors[6], callback);
            },
            function (callback) {
                entityCreate('Party', users[0], topics[2], colors[4], callback);
            },
        ],
        // optional callback
        cb);
}

function topicCreate(name, user, color, cb) {

    var topic = new Topic({name: name, user: user, color: color});

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
                topicCreate('University', users[0], colors[3], callback);
            },
            function (callback) {
                topicCreate('Sport', users[0], colors[12], callback);
            },
            function (callback) {
                topicCreate('Personal', users[0], colors[5], callback);
            },
        ],
        // optional callback
        cb);
}

function eventCreate(name, timeStart, timeEnd, entity, user, place, about, cb) {

    var event = new Event({
        name: name, timeStart:timeStart, timeEnd:timeEnd,
        entity: entity, user: user, place:place, about: about});

    event.save(function (err) {

        if (err) console.log(err);

        cb(null, true);
    });
}

/*
    name: {type: String, required: true, trim: true},
    timeStart: { type: Date, required: true},
    timeEnd: { type: Date, required: true},
    entity: {type: Schema.ObjectId, ref: 'Entity', required: true},
    user: {type: Schema.ObjectId, ref: 'User', required: true},
    place: {type: String, trim: true},
    about: {type: String, trim: true},
*/
function createEvents(cb) {

    console.log('events create');

    async.series([
            function (callback) {
                eventCreate('Lection', '2020-11-30T08:30', '2020-11-30T09:50', entities[0], users[0], 'online', 'comment', callback);
            },
            function (callback) {
                eventCreate('Practice', '2020-11-30T11:40', '2020-11-30T13:30', entities[0], users[0], 'online', 'comment', callback);
            },
            function (callback) {
                eventCreate('Practice', '2020-11-30T15:00', '2020-11-30T16:20', entities[1], users[0], 'online', 'comment', callback);
            },
            function (callback) {
                eventCreate('Lection', '2020-11-30T16:30', '2020-11-30T17:50', entities[1], users[0], 'online', 'comment', callback);
            },
            function (callback) {
                eventCreate('Lection', '2020-12-03T08:30', '2020-12-03T09:50', entities[2], users[0], 'online', 'comment', callback);
            },
            function (callback) {
                eventCreate('Practice', '2020-12-03T11:40', '2020-12-03T13:30', entities[2], users[0], 'online', 'comment', callback);
            },
            function (callback) {
                eventCreate('Practice', '2020-12-03T15:00', '2020-12-03T16:20', entities[3], users[0], 'online', 'comment', callback);
            },
            function (callback) {
                eventCreate('Lection', '2020-12-04T16:30', '2020-12-04T17:50', entities[3], users[0], 'online', 'comment', callback);
            },
            function (callback) {
                eventCreate('Training', '2020-12-04T19:00', '2020-12-04T20:30', entities[10], users[0], 'Cort', 'comment', callback);
            },
            function (callback) {
                eventCreate('Training', '2020-12-05T08:00', '2020-12-05T09:30', entities[9], users[0], 'Pool', 'comment', callback);
            },
            function (callback) {
                eventCreate('Game', '2020-12-02T17:00', '2020-12-02T19:30', entities[11], users[0], 'Park', 'comment', callback);
            },
            function (callback) {
                eventCreate('Training', '2020-12-08T19:00', '2020-12-08T20:30', entities[10], users[0], 'Cort', 'comment', callback);
            },
            function (callback) {
                eventCreate('Training', '2020-12-04T08:00', '2020-12-04T09:30', entities[9], users[0], 'Pool', 'comment', callback);
            },
            function (callback) {
                eventCreate("Birthday", '2020-12-03T22:00', '2020-12-03T23:30', entities[12], users[0], 'Club', 'comment', callback);
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

    var habit = new Habit({name: name, user: user, isActual: isActual, thisMonthTargetCount: thisMonthTargetCount, thisMonthCounter: thisMonthCounter, counter: counter, curDate: '', dateIn: Date.now()});

    habit.save(function (err) {

        if (err) console.log(err);

        cb(null, true);
    });
}

function createHabits(cb) {

    console.log('habits create');

    async.series([
            function (callback) {
                habitCreate('Meditation', users[0], true, 15, 0, 21, callback);
            },
            function (callback) {
                habitCreate('Reading', users[0], true, 10, 0, 10, callback);
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

function colorCreate(name, cb) {

    var color = new Color({name: name});

    color.save(function (err) {

        if (err) console.log(err);

        colors.push(color);

        cb(null, true);
    });
}

function createColors(cb) {

    console.log('colors create');

    async.series([
            function (callback) {
                colorCreate('#ef534e', callback);
            },
            function (callback) {
                colorCreate('#ec407a', callback);
            },
            function (callback) {
                colorCreate('#ab47bc', callback);
            },
            function (callback) {
                colorCreate('#7e57c2', callback);
            },
            function (callback) {
                colorCreate('#5c6bc0', callback);
            },
            function (callback) {
                colorCreate('#42a5f5', callback);
            },
            function (callback) {
                colorCreate('#29b6f6', callback);
            },
            function (callback) {
                colorCreate('#26c6da', callback);
            },
            function (callback) {
                colorCreate('#26a69a', callback);
            },
            function (callback) {
                colorCreate('#66bb6a', callback);
            },
            function (callback) {
                colorCreate('#9ccc65', callback);
            },
            function (callback) {
                colorCreate('#ffa726', callback);
            },
            function (callback) {
                colorCreate('#ff7043', callback);
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
            function (callback) {
                Color.deleteMany({}, () => {
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
        createColors,
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