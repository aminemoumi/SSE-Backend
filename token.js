const jwt = require('jsonwebtoken');

// Jeton JWT à vérifier
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlIjoidXNlciIsImlhdCI6MTcwNzkwMDYzOH0.YQEojfrBZVHx7Fcp8DGy5OAySDzOXVN3HBZsD5bi1_Y';

// Clé secrète utilisée pour signer le jeton (doit être la même que celle utilisée pour générer le jeton)
const secretKey = 'monPetitDoigtMaDit';

// Vérifier la signature du jeton
jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    console.error('La signature du jeton est invalide : ', err);
  } else {
    console.log('La signature du jeton est valide.');
    // decoded contient les informations décodées (header et payload) du jeton
    console.log('Contenu décodé du jeton : ', decoded);
  }
});
