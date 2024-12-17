"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Orders", "userId", {
      type: Sequelize.UUID,
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Orders", "userId", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
