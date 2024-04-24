const { DataTypes } = require('sequelize');
const sequelize = require('../database');


const Risklevel3 = sequelize.define('Risklevel3', 
  {
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, 
  {
    tableName: 'risk_level_3',
    timestamps: false  // Désactiver les timestamps // Spécifier le nom de la table
  }

);
module.exports = Risklevel3;



