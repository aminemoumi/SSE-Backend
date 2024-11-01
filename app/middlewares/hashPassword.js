const bcrypt = require('bcrypt');

const hashPassword = (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    req.hashedPassword = hashedPassword;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = hashPassword;