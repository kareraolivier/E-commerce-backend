"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Reviews", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      productId: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.INTEGER,
      },
      comment: {
        type: Sequelize.STRING,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
      },
      isActive: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Reviews");
  },
};
