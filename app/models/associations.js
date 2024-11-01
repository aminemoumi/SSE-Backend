const User = require('./user');
const Role = require('./role');
const Statement = require('./event'); // Renommé de Event

//Association user-role
// un user a un rôle 
User.belongsTo(Role, { 
  foreignKey: 'role_id', 
  as: 'role' 
});

//La réciproque : un role a plusieurs utilisateurs
Role.hasMany(User, { 
  foreignKey: 'role_id', 
  as: 'users' 
});

//Association user-statement
// un statement a un déclarant 
Statement.belongsTo(User, { 
  as: 'user' 
});

// La réciproque: Un déclarant a plusieurs statements
User.hasMany(Statement, {
  foreignKey: "user_id",
  as: "statements"
});

module.exports = { User, Role, Statement }; 