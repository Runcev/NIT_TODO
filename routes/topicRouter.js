var express = require('express');
var router = express.Router();
var topicController = require('../controllers/topicController');

/*
// middleware - це якщо щось треба буде спочатку виконати при всіх запитах
router.use(function (req, res, next) {
    next()
})
 */

/*
GET `/api/topic`
GET `/api/topic/:id`
GET `/api/topic/:id/events` - всі події у вибраній категорії
POST `/api/topic/add`
POST (PUT) `/api/topic/:id/update` - змінюємо
DELETE (GET)`/api/topic/:id/delete` - видаляємо
 */

router.get('/', topicController.topicList);

router.post('/add', topicController.topicAdd);

router.get('/add', function (req, res) {
    res.render('topic/topicAdd', {title: 'Add topic'});
});

router.get('/:id/events', topicController.topicEventsList);

router.post('/:id/update', topicController.topicUpdate);
router.put('/:id/update', topicController.topicUpdate);

router.get('/:id/delete', topicController.topicDelete);
router.delete('/:id/delete', topicController.topicDelete);

module.exports = router;
