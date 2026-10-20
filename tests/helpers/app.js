const express = require('express');
const router = require('../../app/router');
const requireUser = require('../../app/middlewares/requireUser');
const eventController = require('../../app/controllers/eventController');
const userController = require('../../app/controllers/userController');
require('../../app/models/associations');

// Application Express de test : mêmes routes que index.js, sans app.listen().
const app = express();
app.use(express.json());
app.use('/api', router);

// Routes supplémentaires pour tester directement les contrôleurs
// qui ne sont pas encore branchés dans router.js
app.patch('/test/events/:id', requireUser, eventController.updateEvent);
app.delete('/test/events/:id', requireUser, eventController.deleteEvent);
app.get('/test/user-events/:id', requireUser, eventController.getEventsByUserId);
app.delete('/test/users/:id', userController.deleteUser);

module.exports = app;
