"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Products", "categoryId", {
      type: Sequelize.UUID,
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Products", "categoryId", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
