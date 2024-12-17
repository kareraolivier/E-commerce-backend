"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Reviews", "userId", {
      type: Sequelize.UUID,
      allowNull: false,
    });
  },
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Reviews", "productId", {
      type: Sequelize.UUID,
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Reviews", "userId", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Reviews", "productId", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
