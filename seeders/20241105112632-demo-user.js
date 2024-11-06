"use strict";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10;
    const hashedPassword1 = await bcrypt.hash("password123", saltRounds);
    const hashedPassword2 = await bcrypt.hash("securepass", saltRounds);

    return queryInterface.bulkInsert("Users", [
      {
        id: uuidv4(),
        firstName: "John",
        lastName: "Doe",
        email: "example@example.com",
        password: hashedPassword1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        firstName: "Mideline",
        lastName: "Laen",
        email: "mideline@example.com",
        password: hashedPassword2,
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
