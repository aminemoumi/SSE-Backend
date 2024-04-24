const bcrypt = require('bcrypt');

const hashPassword = (req, res, next) => {
  try {
    const { password } = req.body;
    // Génére le hachage du mot de passe
    const hashedPassword = bcrypt.hashSync(password, 10);
    // Ajoute le mot de passe haché à l'objet req pour qu'il soit accessible dans le createUser
    req.hashedPassword = hashedPassword;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = hashPassword;
