//Vérification du Token

const jwt = require('jsonwebtoken');

const requireAdmin = (req, res, next) => {
  // Récupérer le jeton JWT depuis l'en-tête Authorization
  const token = req.headers.authorization;
 

  // Vérifier si le jeton est présent
  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  try {
    // Extraire le jeton du format "Bearer <token>" cf stackOverflow 
    // https://stackoverflow.com/questions/48606341/jwt-gives-jsonwebtokenerror-invalid-token
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/split

    const tokenParts = token.split(' ');

    // Décoder le jeton JWT pour obtenir les informations de l'utilisateur
    const decodedToken = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
    req.user = decodedToken;

    // Vérifier si l'utilisateur est un administrateur (role = admin)
    if (decodedToken.userRole === 'admin') {
      // Autoriser l'accès aux fonctionnalités d'administration
      next();
    } else {
      // Sinon, renvoyer une réponse d'erreur
      return res.status(403).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    // En cas d'erreur de décodage du jeton, renvoyer une réponse d'erreur
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = requireAdmin;
