const express = require('express');
const morgan = require('morgan');

const router = require('./routes/mainRoute');
const errorhandlerController = require('./controllers/errorHandlerController');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(router);
app.use(errorhandlerController);

module.exports = app;
