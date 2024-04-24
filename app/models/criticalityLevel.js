const { DataTypes } = require('sequelize');
const sequelize = require('../database');


const Criticality = sequelize.define('Criticality', 
  {
    frequency:    {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    gravity:      {
      type: DataTypes.INTEGER,
      allowNull: true
    },        

    criticality_note: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['A', 'B', 'C']]
      }
    }
    
  }, 
  {
    tableName: 'criticality',
    timestamps: false  // Désactiver les timestamps // Spécifier le nom de la table
  }

);
module.exports = Criticality;