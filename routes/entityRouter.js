var express = require('express');
var router = express.Router();
var entityController = require('../controllers/entityController');

/*
// middleware - це якщо щось треба буде спочатку виконати при всіх запитах
router.use(function (req, res, next) {
    next()
})
 */

/*
GET /api/entity
GET /api/entity/:id
POST /api/entity/add
POST (PUT) /api/entity/:id/update - змінюємо
DELETE (GET)/api/entity/:id/delete - видаляємо
 */

router.get('/', entityController.entityList);

router.post('/add', entityController.entityAdd);

router.get('/add', entityController.entityAddGet);
router.get('/add/:topicId', entityController.entityAddGet);

router.get('/:id/edit', entityController.entityEdit);

router.get('/:id', entityController.entityDetail);

router.post('/:id/update', entityController.entityUpdate);
router.put('/:id/update', entityController.entityUpdate);

router.get('/:id/delete', entityController.entityDelete);
router.delete('/:id/delete', entityController.entityDelete);

module.exports = router;
