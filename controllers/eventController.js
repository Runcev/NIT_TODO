
exports.eventList = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};

exports.eventDetail = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};

exports.eventAdd = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};

exports.eventUpdate = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};

exports.eventDelete = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};
