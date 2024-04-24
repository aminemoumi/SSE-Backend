const jwt = require('jsonwebtoken');

const requireUser = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }
  
  try {
    const tokenParts = token.split(' ');
    const decodedToken = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
    req.user = decodedToken;
  
    // Vérifier si l'utilisateur est authentifié
    if (!decodedToken.userRole) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
  
    // Autoriser l'accès si l'utilisateur a un rôle (user ou admin) ou est un visiteur authentifié
    if (decodedToken.userRole === 'user' || decodedToken.userRole === 'admin') {
      next();
    } else {
      return res.status(403).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
  
module.exports = requireUser;