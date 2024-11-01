const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Statement = sequelize.define('Statement', 
  {
    site_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    site_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    site_town: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    witness: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    event_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    info_sse_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    }
  }, 
  {
    tableName: 'statement',
    underscored: true
  }
);

module.exports = Statement;