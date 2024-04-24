const { DataTypes } = require('sequelize');
const sequelize = require('../database');


const WorkPhase = sequelize.define('WorkPhase', 
  {
    title:   {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, 
  {
    tableName: 'work_phase',
    timestamps: false  // Désactiver les timestamps // Spécifier le nom de la table
  }

);
module.exports = WorkPhase;