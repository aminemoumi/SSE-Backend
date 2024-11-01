const express = require('express');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const eventController = require('./controllers/eventController');
const passwordValidator = require('./middlewares/passwordValidator');
const hashPassword = require('./middlewares/hashPassword');
const requireAdmin = require('./middlewares/requireAdmin');
const requireUser = require('./middlewares/requireUser');

const router = express.Router();

router.post('/login', authController.login);
router.post('/change-password/:id', passwordValidator, hashPassword, userController.changePassword);

router.use(requireUser);

router.get('/events', eventController.getEventPage);
router.get('/events/:id', eventController.getOneEvent);
router.post('/events', eventController.createEvent);

router.use(requireAdmin);

router.get('/users', userController.getUsers);

module.exports = router;

