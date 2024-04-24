const { DataTypes } = require('sequelize');
const sequelize = require('../database');


const Risklevel1 = sequelize.define('Risklevel1', 
  {
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, 
  {
    tableName: 'risk_level_1',
    timestamps: false  // Désactiver les timestamps // Spécifier le nom de la table
  }

);
module.exports = Risklevel1;