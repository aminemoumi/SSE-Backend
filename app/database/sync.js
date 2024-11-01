const sequelize = require('../database');
require('../models/associations');

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Base de données synchronisée avec succès');
  } catch (error) {
    console.error('Erreur lors de la synchronisation :', error);
  }
};

module.exports = syncDatabase; 