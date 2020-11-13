var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

/*
// middleware - це якщо щось треба буде спочатку виконати при всіх запитах
router.use(function (req, res, next) {
    next()
})
 */

router.get('/', userController.userList);

router.post('/login', userController.userLogin);

router.get('/add', function (req, res) {
    res.render('user/userAdd', {title: 'Add user'});
});

router.get('/:id/edit', function (req, res) {
    res.render('index', {title: 'Edit user'});
});

router.post('/add', userController.userAdd);

router.post('/:id/update', userController.userUpdate);
router.put('/:id/update', userController.userUpdate);

router.get('/:id', userController.userDetail);

module.exports = router;
