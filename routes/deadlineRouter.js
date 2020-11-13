var express = require('express');
var router = express.Router();
var deadlineController = require('../controllers/deadlineController');

/*
// middleware - це якщо щось треба буде спочатку виконати при всіх запитах
router.use(function (req, res, next) {
    next()
})
 */

/*
GET /api/deadline
GET /api/deadline/:id
POST /api/deadline/add
POST (PUT) /api/deadline/:id/update - змінюємо
DELETE (GET)/api/deadline/:id/delete - видаляємо
 */

router.get('/', deadlineController.deadlineList);

router.post('/add', deadlineController.deadlineAdd);

router.get('/:id', deadlineController.deadlineDetail);

router.post('/:id/update', deadlineController.deadlineUpdate);
router.put('/:id/update', deadlineController.deadlineUpdate);

router.get('/:id/delete', deadlineController.deadlineDelete);
router.delete('/:id/delete', deadlineController.deadlineDelete);

module.exports = router;
