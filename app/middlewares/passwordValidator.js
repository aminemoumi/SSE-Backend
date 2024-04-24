const passwordValidator = async (req, res, next) => {
  const { password } = req.body;

  try {
    // Vérifier la longueur minimale du mot de passe
    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters long" });
    }
  
    // Vérifier la complexité du mot de passe
    // eslint-disable-next-line no-useless-escape
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_\-])[A-Za-z\d@$!%*?&_\-]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character" });
    }
  
    next(); // Passer au prochain middleware si la validation réussit
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
  
module.exports = passwordValidator;
  