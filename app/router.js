
const express = require('express');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const eventController = require('./controllers/eventController');

const passwordValidator = require('./middlewares/passwordValidator');
const hashPassword = require('./middlewares/hashPassword');
const requireAdmin = require('./middlewares/requireAdmin');
const requireUser = require('./middlewares/requireUser');

const router = express.Router();

// Authentification
router.post('/login', authController.login);
router.post(
  '/change-password/:id',
  passwordValidator,
  hashPassword,
  userController.changePassword
);

// Routes accessibles aux utilisateurs connectés
router.use(requireUser);

router.get('/events', eventController.getEventPage);
router.get('/events/:id', eventController.getOneEvent);
router.post('/events', eventController.createEvent);
router.put('/events/:id', eventController.updateEvent);
router.delete('/events/:id', eventController.deleteEvent);

// Routes réservées aux administrateurs
router.use(requireAdmin);

router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getOneUser);
router.patch('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;


