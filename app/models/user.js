const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
  enterprise: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  password_changed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  firstname: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  lastname: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  position: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  process: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'role_id'
  }
}, {
  tableName: 'user',
  timestamps: false,
  defaultScope: {
    attributes: { exclude: ['password'] }
  }
});

User.prototype.toJSON = function toJSON() {
  const values = { ...this.get() };
  delete values.password;
  return values;
};

module.exports = User;