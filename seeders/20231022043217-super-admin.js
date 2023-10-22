'use strict';
const { User } = require('../src/models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'yoga',
        address: 'jln ekonomi',
        age: 20,
        role: 'superadmin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        name: 'helmi',
        address: 'jln badak',
        age: 21,
        role: 'superadmin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const userData = await User.findAll();

    await queryInterface.bulkInsert('Auths', [
      {
        email: 'yoga@gmail.com',
        phoneNumber: '6282266951933',
        password:
          '$2a$10$qKedg7UsTXEVqsM8aUGfaeVNnrRg1OgmdNUUPj.NKOy/nGZ1GVfja',
        userId: userData[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        email: 'helmi@gmail.com',
        phoneNumber: '6282356789054',
        password:
          '$2a$10$ygY9tcM3F7sDlDvcFdhHlebIPhOPX3E1sSWIF6oAIpn3GxmmGvgRe',
        userId: userData[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'Users',
      null,
      {}
    );
    await queryInterface.bulkDelete(
      'Auths',
      null,
      {}
    );
  },
};
