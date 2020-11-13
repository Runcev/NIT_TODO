var express = require('express');
var router = express.Router();
var todoController = require('../controllers/todoController');

/*
// middleware - це якщо щось треба буде спочатку виконати при всіх запитах
router.use(function (req, res, next) {
    next()
})
 */

router.get('/', todoController.todoList);

router.post('/add', todoController.todoAdd);

router.get('/:id', todoController.todoDetail);

router.post('/:id/update', todoController.todoUpdate);
router.put('/:id/update', todoController.todoUpdate);

router.get('/:id/delete', todoController.todoDelete);
router.delete('/:id/delete', todoController.todoDelete);

module.exports = router;
