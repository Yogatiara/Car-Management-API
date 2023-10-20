const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const router = require('./routes/mainRouter');
const errorhandlerController = require('./controllers/errorHandlerController');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors);
app.use(router);
app.use(errorhandlerController);

module.exports = app;
