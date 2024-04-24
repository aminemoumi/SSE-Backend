const { DataTypes } = require('sequelize');
const sequelize = require('../database');


const Event = sequelize.define('Event', 
  {
    site_name:    {
      type: DataTypes.TEXT,
      allowNull: false
    },
    site_number:    {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    site_town:    {
      type: DataTypes.TEXT,
      allowNull: false
    },
    witness:    {
      type: DataTypes.TEXT,
      allowNull: true
    },
    event_description:   
    {
      type: DataTypes.TEXT,
      allowNull: false
    },
    info_sse_description:    
    {
      type: DataTypes.TEXT,
      allowNull: true
    },   
            
    status_event:   
    {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    corrective_action:    
    {
      type: DataTypes.TEXT,
      allowNull: true
    },
    deadline_action:    
    {
      type: DataTypes.DATE,
      allowNull: true
    },
    action_pilot:    
    {
      type: DataTypes.TEXT,
      allowNull: true
    },           
    action_status: 
    {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id' // nom de la colonne dans la bdd
      
    }
  }, 

  {
    tableName: 'statement',
    underscored: true
  }

);
module.exports = Event;