const { DataTypes } = require('sequelize');
const sequelize = require('../database');


const Role = sequelize.define('Role', 
  {
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, 
  {
    tableName: 'role', // Spécifier le nom de la table
    timestamps: false  // Désactiver les timestamps
  }

);
module.exports = Role;



