const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const router = require('./routes/mainRouter');
const errorhandlerController = require('./controllers/errorHandlerController');
const ApiError = require('./utils/ApiError');

const app = express();

app.use(cors());

app.use(express.json());
app.use(morgan('dev'));
app.all('*', (req, res, next) => {
  next(
    new ApiError(`Routes does not exist`, 404)
  );
});

app.use(router);
app.use(errorhandlerController);

module.exports = app;
