var express = require('express');
var router = express.Router();
var Todo = require('../models/todoModel');
var Event = require('../models/eventModel');
var Entity = require('../models/entityModel');
var Topic = require('../models/topicModel');
var Habit = require('../models/habitModel');
var Deadline = require('../models/deadlineModel');

/* GET home page. */
router.get('/', function (req, res, next) {

    let showDay = req.query.showDay??'';

    res.render('index', {title: '', showDay: showDay});
});

router.get('/right-block', function (req, res, next) {

    let user = req.currentUser;

    Event.find({user: user._id}).populate({path: 'entity', populate: {path: 'topic'}}).sort('timeStart')
        .exec(function (err, events) {
            if (err) console.log(err);

            Todo.find({user: user._id})
                .exec(function (err, todos) {
                    if (err) {
                        console.log(err);
                    }

                    Habit.find({user: user._id}).sort({isActual: -1})
                        .exec(function (err, habits) {
                            if (err) {
                                console.log(err);
                            }

                            Deadline.find({user: user._id}).populate('entity')
                                .exec(function(err,deadlines){
                                    if(err){
                                        console.log(err);
                                    }

                                    res.render('right_block_content', {events: events, habits: habits, todos: todos, deadlines: deadlines });
                                });
                        });
                });
        });
});


module.exports = router;
