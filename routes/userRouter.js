var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

/*
 реєстрація та авторизація винесена в appServer.js
*/

router.get('/', userController.userList);

router.get('/logout', userController.userLogout);

router.get('/profile', userController.userEdit);

router.post('/update', userController.userUpdate);

module.exports = router;
