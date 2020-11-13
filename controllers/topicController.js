
exports.topicList = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};

exports.topicEventsList = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};

exports.topicDetail = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};

exports.topicAdd = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};

exports.topicUpdate = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};

exports.topicDelete = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};
