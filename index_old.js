// Charger les variables environnment // Load environment variables
require("dotenv").config();

// Importer les dépendances NPM // Import NPM dependencies
const express = require("express");

//Importer les dépendances locales // Import local dependencies
const apiRouter = require("./app/router");





// Créer l'app // Create the app
const app = express();

// On configure le middleware qui prend en charge les routes // Middleware handling our roads
app.use('/api',apiRouter);





// Middleware pour renvoyer La Page de connexion // Middleware to send our authentification sheet
app.get('/api', (req, res) => {
    res.send("Page d'authentification pour accéder à notre API - Suivi-SSE");
});

// Middleware pour les erreurs 404 // Middleware for 404 errors
app.use((req, res, next) => {
    res.status(404).send("Sorrrrrrrry error");
});





// Démarrage du serveur // Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
