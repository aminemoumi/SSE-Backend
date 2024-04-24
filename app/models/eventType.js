const { DataTypes } = require('sequelize');
const sequelize = require('../database');


const EventType = sequelize.define('EventType', 
  {
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, 
  {
    tableName: 'event_type',
    timestamps: false  // Désactiver les timestamps // Spécifier le nom de la table
  }

);
module.exports = EventType;