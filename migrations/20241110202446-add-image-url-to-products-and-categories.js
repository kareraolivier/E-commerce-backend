"use strict";

// In the generated migration file
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Products", "imageUrl", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Categories", "imageUrl", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn("Products", "imageUrl");
    await queryInterface.removeColumn("Categories", "imageUrl");
  },
};
