const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Role } = require('../models/associations'); // importation des utilisateurs avec les associations

const generateAuthToken = (userId, userRole) => {
  return jwt.sign({ userId, userRole }, process.env.JWT_SECRET);
};

// Méthode pour la redirection vers la page de changement de mot de passe
const redirectToChangePassword = (req, res) => {
  const { id } = req.params;
  
  res.redirect(`/change-password/${id}`);
};
// Route pour la connexion des utilisateurs
/**
 * @swagger
 * /api/login:
 *    post:
 *      summary: Connexion à l'application et vérifications d'usage
 *      description: Vérification Utilisateurs / Administrateurs et mot de passe  + Création du JWT
 *      parameters:
 *        - in: body
 *          name: body
 *          required: true
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *      responses: 
 *          200:
 *            description: Connexion réussie
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                authToken:
 *                  type: string
 *          401:
 *            description: Email ou mot de passe invalide
 *          500:
 *            description: Erreur interne du serveur
 */

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    // Récupérer l'utilisateur avec son rôle depuis la base de données
    const user = await User.findOne({ 
      where: { email },
      include: [{ model: Role, as: 'role', attributes: ['title'] }]
    });

    // Vérifier si l'utilisateur existe
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Vérifier si le mot de passe est correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (!user.role) {
      return res.status(401).json({ message: 'User role not found' });
    }

    // Récupérer le titre du rôle de l'utilisateur
    const userRole = user.role.title;

    if (userRole === 'admin') {
      user.password_changed = true;
    }
    
    // Vérifier si le champ password_changed est défini (dans la bdd)
    if (user.password_changed === false) {
      // Rediriger l'utilisateur vers la page de modification du mot de passe
      return res.status(200).json({ message: 'First login - Change password',userId: user.id});
    }

    // Générer le jeton JWT avec l'ID du rôle
    const authToken = generateAuthToken(user.id, userRole);
    
    res.status(200).json({ message: 'connexion réussie', authToken }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { login, redirectToChangePassword };
