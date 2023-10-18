const Sequelize = require('sequelize');

const {
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_DIALECT,
} = process.env;

const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    dialect: DATABASE_DIALECT,
  }
);

const databaseValidation = async () => {
  try {
    await sequelize.authenticate();
    console.log('Success connect to database');
  } catch (err) {
    console.error(
      `Unable to connect to the database: ${err}`
    );
  }
};

module.exports = {
  databaseValidation,
  development: {
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    dialect: DATABASE_DIALECT,
  },
};
