require('dotenv').config();
const express = require('express');
// const helmet = require('helmet');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./utils/constants');
const routes = require('./routes/index');
const cors = require('./middlewares/cors');
const handleServerError = require('./middlewares/handleServerError');

const DB_CONN = 'mongodb://localhost:27017/mestodb';

const { PORT = 3001 } = process.env;

const app = express();

app.use('*', cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_CONN, {
  useNewUrlParser: true,
});

app.use(requestLogger);

// app.use(helmet());
app.use(limiter);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(handleServerError);

app.listen(PORT);
