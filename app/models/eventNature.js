const { DataTypes } = require('sequelize');
const sequelize = require('../database');


const EventNature = sequelize.define('EventNature', 
  {
    title : {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, 
  {
    tableName: 'event_nature',
    timestamps: false  // Désactiver les timestamps // Spécifier le nom de la table
  }

);
module.exports = EventNature;