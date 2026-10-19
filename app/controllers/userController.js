const User = require('../models/user');
const Role = require('../models/role');
const hashPassword = require('../middlewares/hashPassword');
const passwordValidator = require('../middlewares/passwordValidator');


const userController = {

  // Logique pour récupérer tous les utilisateurs
  getUsers : async (req, res) => {
    try {
      // Logique pour récupérer les utilisateurs depuis la base de données
      const users = await User.findAll({
        include :[
          {model: Role,
            as : 'role'}
        ],
        attributes: { exclude: ['password'] } // Exclure le mot de passe de la réponse
      });
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  //---------------------------------------------------------------------------------
  //Logique pour récupérer un utilisateur depuis la base de données
  getOneUser : async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      
      // On vérifie les user inputs
      if(isNaN(userId)) { 
        res.status(400).json({ error: "Invalid user ID. Please verify the provided id." });
        return;
      }

      const user = await User.findByPk(userId,{ 
        include :[
          {model: Role,
            as : 'role'}
        ],
        attributes: { exclude: ['password'] } // Exclure le mot de passe de la réponse
      });
      if (! user) { // si n'existe pas => 404
        res.status(404).json({ error: "User not found. Please verify the provided id." });
        return; // On arrête la fonction avec return
      }
    
      res.json(user); // si l'utilisateur existe => on le retourne

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  //--------------------------------------------------------------------------------------
  // Logique pour créer un nouvel utilisateur dans la base de données
  createUser: async (req, res) => {
    try {
    // Utiliser le middleware de validation du mot de passe
      passwordValidator(req, res, async () => {
      // Utiliser le middleware hashPassword pour hacher le mot de passe avant la création de l'utilisateur
        hashPassword(req, res, async () => {
          const { enterprise, email, firstname, lastname, password, position, process } = req.body;
          const roleId = parseInt(req.body.role_id);

          // Vérifier si l'utilisateur existe déjà dans la base de données
          const existingUser = await User.findOne({ where: { email } });
          if (existingUser) {
            return res.status(400).json({ error: "Cet utilisateur existe déjà" });
          }

          if (!enterprise || !email || !firstname || !lastname || !password || !position || !process || !roleId) {
            return res.status(400).json({ error: "Il manque un élément ou un élément est non conforme, vérifiez tous les critères." });
          }
          const hashedPassword = req.hashedPassword;

          const createdUser = await User.create({
            enterprise,
            email,
            firstname,
            lastname,
            password: hashedPassword, // Utiliser le mot de passe haché
            position,
            process,
            roleId
          });

          const newUser = await User.findByPk(createdUser.id, {
            include: [{ model: Role, as: 'role' }]
          });

          res.status(200).json({ message: 'Utilisateur créé avec succès', newUser });
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },


  //--------------------------------------------------------------------------
  // Logique pour mettre à jour un utilisateur
  updateUser : async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const { enterprise, email, firstname, lastname, position, process, roleId } = req.body;

      if(isNaN(userId)) { // On vérifie les user inputs
        res.status(400).json({ error: "Invalid user ID. Please verify the provided id." });
        return;
      }

      const user = await User.findByPk(userId);
      if (!user) { // si n'existe pas => 404
        res.status(404).json({ error: "User not found. Please verify the provided id." });
        return; 
      }

      // Ne pas écraser le mot de passe : le changement se fait via /change-password/:id
      if (enterprise !== undefined) user.enterprise = enterprise;
      if (email !== undefined) user.email = email;
      if (firstname !== undefined) user.firstname = firstname;
      if (lastname !== undefined) user.lastname = lastname;
      if (position !== undefined) user.position = position;
      if (process !== undefined) user.process = process;

      const nextRoleId = roleId ?? req.body.role_id;
      if (nextRoleId !== undefined && nextRoleId !== null && nextRoleId !== '') {
        user.roleId = parseInt(nextRoleId);
      }

      await user.save();

      const updatedUser = await User.findByPk(userId, {
        include: [{ model: Role, as: 'role' }],
        attributes: { exclude: ['password'] }
      });

      res.json(updatedUser);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // -----------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------
  // Logique pour supprimer un utilisateur: on ne peut pas supprimer un utilisateur qui a déjà enregistré un évènement.
  // Nous devons garder la traçabilité des personnes qui ont enregistré les évènements,
  // il faut passer l'utilisateur en visiteur.
  deleteUser : async (req, res) => {
    try {
      const userId = req.params.id;
        
      const user = await User.findByPk(userId, {
        include: [
          { model: Role, as: 'role' },
          { association: 'statements' }
        ]
      });
      if (! user) {
        return res.status(404).json({ error: "User not found. Please verify the provided id." });
      }

      const hasStatements = Array.isArray(user.statements) && user.statements.length > 0;

      if (hasStatements) {
        const visitorRole = await Role.findOne({ where: { title: 'visitor' } });
        if (!visitorRole) {
          return res.status(500).json({ message: 'Rôle visiteur introuvable.' });
        }

        if (user.roleId === visitorRole.id) {
          return res.status(400).json({
            error: "Impossible de supprimer cet utilisateur : il a déjà enregistré des événements."
          });
        }

        user.roleId = visitorRole.id;
        await user.save();

        const updatedUser = await User.findByPk(userId, {
          include: [{ model: Role, as: 'role' }],
          attributes: { exclude: ['password'] }
        });

        return res.status(200).json({
          deactivated: true,
          message: "Cet utilisateur a déjà enregistré des événements. Il a été passé en visiteur pour conserver la traçabilité.",
          user: updatedUser
        });
      }

      await user.destroy();
      
      return res.status(200).json({ deleted: true, message: "L'utilisateur a été supprimé avec succès" });

    }  catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  changePassword: async (req, res) => {
    const { id } = req.params;

  
    try {
      // passer au middleware hashPassword pour hacher le nouveau mot de passe
      hashPassword(req, res, async () => {
        
        // Récupérer l'utilisateur à partir de la base de données
        const user = await User.unscoped().findByPk(id);
  
        if (!user) {
          return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
  
        // Mettre à jour le mot de passe de l'utilisateur avec le mot de passe hashed
        user.password = req.hashedPassword;
        user.password_changed = true; // Mettre à jour le statut du mot de passe changé dans la db
        
        await user.save();
  
        res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
      });
    } catch (error) {
      console.error('Erreur lors de la modification du mot de passe:', error);
      res.status(500).json({ message: 'Erreur serveur lors de la modification du mot de passe' });
    }
  }
};
module.exports = userController; 
