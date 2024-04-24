const { DataTypes } = require('sequelize');
const sequelize = require('../database');


const DetectionContext = sequelize.define('DetectionContext', 
  {
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, 
  {
    tableName: 'detection_context',
    timestamps: false  // Désactiver les timestamps // Spécifier le nom de la table
  }

);
module.exports = DetectionContext;