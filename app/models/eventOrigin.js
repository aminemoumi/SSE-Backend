const { DataTypes } = require('sequelize');
const sequelize = require('../database');


const EventOrigin = sequelize.define('EventOrigin', 
  {
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, 
  {
    tableName: 'event_origin',
    timestamps: false  // Désactiver les timestamps // Spécifier le nom de la table
  }

);
module.exports = EventOrigin;