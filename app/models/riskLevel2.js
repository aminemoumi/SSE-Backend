const { DataTypes } = require('sequelize');
const sequelize = require('../database');


const Risklevel2 = sequelize.define('Risklevel2', 
  {
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, 
  {
    tableName: 'risk_level_2',
    timestamps: false  // Désactiver les timestamps // Spécifier le nom de la table
  }

);
module.exports = Risklevel2;