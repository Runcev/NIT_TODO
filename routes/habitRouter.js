var express = require('express');
var router = express.Router();
var habitController = require('../controllers/habitController');

/*
// middleware - це якщо щось треба буде спочатку виконати при всіх запитах
router.use(function (req, res, next) {
    next()
})
 */

/*
GET /api/habit
GET /api/habit/:id
POST /api/habit/add
POST (PUT) /api/habit/:id/update - змінюємо
DELETE (GET)/api/habit/:id/delete - видаляємо
 */

router.get('/', habitController.habitList);

router.get('/view', habitController.habitList);

router.get('/add', habitController.habitAddGet);

router.post('/add', habitController.habitAdd);

router.get('/:id/edit', habitController.habitEdit);

router.get('/:id', habitController.habitDetail);

router.post('/:id/update', habitController.habitUpdate);
router.put('/:id/update', habitController.habitUpdate);

router.get('/:id/delete', habitController.habitDelete);
router.delete('/:id/delete', habitController.habitDelete);

module.exports = router;
