'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM(
          'small',
          'medium',
          'large'
        ),
      },
      image: {
        type: Sequelize.TEXT,
        defaultValue:
          'https://pictures.dealer.com/c/caldwellcountrychevrolettx/1134/a976281f56ff06d46dc390283aa14da6x.jpg?impolicy=downsize_bkpt&imdensity=1&w=520',
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
    await queryInterface.dropTable('Cars');
  },
};
