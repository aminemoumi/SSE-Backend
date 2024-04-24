const express = require('express');
const router = express.Router();
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const eventController = require ('./controllers/eventController');
const eventTitlesController = require ('./controllers/eventTitlesController');
const passwordValidator = require('./middlewares/passwordValidator');
const hashPassword = require('./middlewares/hashPassword');
const requireAdmin = require('./middlewares/requireAdmin');
const requireUser = require('./middlewares/requireUser');
const statController = require('./controllers/statController');

// Routes pour se connecter, s'authentifier
// Routes to connect, authenticate
router.post('/login', authController.login);
router.get('/change-password/:id', authController.redirectToChangePassword);
router.post('/change-password/:id', passwordValidator, hashPassword, userController.changePassword);

// Routes pour récupérer, les titres de nos tables, ventilés par méthode.
// Routes to retrieve the titles of our tables, broken down by method.
router.get('/workphase/titles', eventTitlesController.getWorkPhaseTitles);
router.get('/eventorigin/titles', eventTitlesController.getEventOriginTitles);
router.get('/detectioncontext/titles', eventTitlesController.getDetectionContextTitles);
router.get('/eventtype/titles', eventTitlesController.getEventTypeTitles);
router.get('/eventnature/titles', eventTitlesController.getEventNatureTitles);
router.get('/risklevel1/titles', eventTitlesController.getRiskLevel1);
// router.get('/titlesevents', eventTitlesController.getRiskLevel2);
// router.get('/titlesevents', eventTitlesController.getRiskLevel3);
router.get('/criticality/infos', eventTitlesController.getCriticalityInfos);

router.use(requireUser);

// Routes pour la gestion des évènements
// Routes for event management
router.get('/events', eventController.getEventPage); // Récupération de tous les événements
router.get('/user-events/:id', eventController.getEventsByUserId); // Récupération de tous les événements d'un utilisateur
router.get('/events/:id', eventController.getOneEvent);// Récupération d'un événement
router.patch('/update-events/:id', eventController.updateEvent);// Mise à jour d'un événement
router.post('/events', eventController.createEvent); // Création d'un nouvel événement

// Middleware d'autorisation pour l'accès aux routes admin
// Authorization middleware for access to admin routes
router.use(requireAdmin);

// Routes pour la gestion des utilisateurs et suppression des événements
// Routes for user management and event deletion
router.get('/users', userController.getUsers); // Récupération de tous les utilisateurs
router.get('/users/:id', userController.getOneUser);// Récupération d'un utilisateur
router.post('/users', userController.createUser); // Création d'un nouvel utilisateur
router.patch('/users/:id', userController.updateUser); // Mise à jour d'un utilisateur
router.delete('/users/:id', userController.deleteUser); // Suppresion d'un utilisateur
router.delete('/events/:id', eventController.deleteEvent); // Suppresion d'un événement

// Routes pour récupérer, les titres de nos tables, ventilés par méthode.
// Routes to retrieve the titles of our tables, broken down by method.

// router.get('/titlesevents', eventTitlesController.getUserByCredentials);
// router.get('/titlesevents', eventTitlesController.getEventByTitles);

// Routes pour la gestion des statistiques
// Routes for statistics management
router.post('/stats/eventsdates', statController.getAllEventsInTimeIntervall); // Récupération de tous les événements dans un intervalle de temps
router.post('/stats/numberevents', statController.getnumberEventsInTimeIntervall); // Récupération du nombre d'événements dans un intervalle de temps


module.exports = router;
