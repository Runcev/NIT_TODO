
exports.entityList = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler - all entities'});
    }
};

exports.entityDetail = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};

exports.entityAdd = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler - add entity'});
    }
};

exports.entityUpdate = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler'});
    }
};

exports.entityDelete = function (req, res) {

    if (req.baseUrl.match(/api/)) {
        res.send('');
    } else {
        res.render('index', {title: 'Scheduler - entity delete'});
    }
};
