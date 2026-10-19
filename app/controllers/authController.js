const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Role } = require('../models/associations');

const generateAuthToken = (userId, userRole) => {
  return jwt.sign({ userId, userRole }, process.env.JWT_SECRET);
};

const authController = {
  redirectToChangePassword: (req, res) => {
    const { id } = req.params;
    res.redirect(`/change-password/${id}`);
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.unscoped().findOne({ 
        where: { email },
        include: [{ model: Role, as: 'role', attributes: ['title'] }]
      });

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      
      if (!user.role) {
        return res.status(401).json({ message: 'User role not found' });
      }

      const userRole = user.role.title;

      if (userRole === 'admin') {
        user.password_changed = true;
      }
      
      if (user.password_changed === false) {
        return res.status(200).json({ message: 'First login - Change password', userId: user.id });
      }

      const authToken = generateAuthToken(user.id, userRole);
      
      res.status(200).json({ message: 'connexion réussie', authToken }); 
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = authController;
