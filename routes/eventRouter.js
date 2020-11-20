var express = require('express');
var router = express.Router();
var eventController = require('../controllers/eventController');

/*
// middleware - це якщо щось треба буде спочатку виконати при всіх запитах
router.use(function (req, res, next) {
    next()
})
 */

/*
GET /api/event
GET /api/event/:id
POST /api/event/add
POST (PUT) /api/event/:id/update - змінюємо
DELETE (GET)/api/event/:id/delete - видаляємо
 */

router.get('/', eventController.eventList);

router.post('/add', eventController.eventAdd);

router.get('/add', function (req, res) {
    res.render('event/eventAdd', {title: 'Add entity'});
});

router.get('/:id/edit', function (req, res) {
    res.render('index', {title: 'Edit event'});
});

router.get('/:id', eventController.eventDetail);

router.post('/:id/update', eventController.eventUpdate);
router.put('/:id/update', eventController.eventUpdate);

router.get('/:id/delete', eventController.eventDelete);
router.delete('/:id/delete', eventController.eventDelete);

module.exports = router;
