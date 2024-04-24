const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false, // false permet de désactiver la journalisation des requêtes SQL dans la console ; true les fait apparaître ;)
  define: {
    updatedAt: "updated_at",
    createdAt: "created_at",
  },
});

module.exports = sequelize;