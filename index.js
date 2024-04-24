require('dotenv').config(); // Chargement des variables d'environnement à partir du fichier .env dans process.env-- Loading environment variables from .env file into process.env

const express = require('express'); // import d'express -- express import
const swaggerJsDoc = require('swagger-jsdoc');// Import du module swagger-jsdoc pour générer la documentation swagger -- Import the swagger-jsdoc module to generate the swagger documentation

const swaggerUiEx = require('swagger-ui-express'); // Import du module swagger-ui-express pour accéder aux informations de swagger via des pages HTLM interactives --Import of the swagger-ui-express module to access swagger information via interactive HTML pages
const app = express(); //création d'une nouvelle instance de l’application Express -- creating a new instance of the Express application
const router = require('./app/router'); // Import du module router -- Import of router module
const cors = require('cors'); // Import du module cors -- Import of cors module

app.use(cors()); // middleware pour activer les requêtes cross-origin.

// Middleware pour enregistrer les en-têtes de la requête
// app.use(function(req, res, next) {
//   console.log('Request headers:', req.headers);
//   next();
// });

app.use(express.urlencoded({ extended: true })); // middleware pour la réception des données de nos formulaires (URL encodées).
app.use(express.json()); // Middleware pour parser le corps des requêtes en JSON

// Accès à la page locale de la doc swagger : http://localhost:5000/api-docs
const swaggerOptions = { // Définition des options de notre documentation swagger
  swaggerDefinition:{
    info: {
      title: 'Suivi-SSE API',
      version: '1.0.0'
    },
    components: {
      schemas: {
        "Event": {
          "type": "object",
          "properties": {
            "site_name": {
              "type": "string"
            },
            "site_number": {
              "type": "integer"
            },
            "site_town": {
              "type": "string"
            },
            "witness": {
              "type": "string"
            },
            "event_description": {
              "type": "string"
            },
            "info_sse_description": {
              "type": "string"
            },
            "status_event": {
              "type": "boolean"
            },
            "corrective_action": {
              "type": "string"
            },
            "deadline_action": {
              "type": "string",
              "format": "date"
            },
            "action_pilot": {
              "type": "string"
            },
            "action_status": {
              "type": "boolean"
            }
          },
          "required": [
            "site_name",
            "site_number",
            "site_town",
            "event_description",
            "status_event"
          ]
        }
      }
    }
  },
  // On pointe vers le fichier qui contient les annotations de notre doc swagger
  apis: [
    '/home/student/Bureau/Spé/projet-16-suivi-sse-back/app/controllers/authController.js',
    '/home/student/Bureau/Spé/projet-16-suivi-sse-back/app/controllers/eventController.js',
  ]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions); // Création de notre documentation en fonction des options ci-avant
// console.log(swaggerDocs);
app.use ('/api-docs', swaggerUiEx.serve, swaggerUiEx.setup(swaggerDocs));// Notre application swagger est accessible via l'URL /api-docs via le port 5000

app.use('/api', router); // On Monte le routeur sur un chemin spécifique : /api


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { // Démarrage du serveur sur le port spécifié
  console.log(`Server is running on port ${PORT}`);
});

