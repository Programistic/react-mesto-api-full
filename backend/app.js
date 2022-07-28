require('dotenv').config();
const express = require('express');
// const helmet = require('helmet');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const { limiter } = require('./utils/constants');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const signup = require('./routes/signup');
const signin = require('./routes/signin');
const auth = require('./middlewares/auth');
const FoundError = require('./errors/FoundError');
// const options = require('./utils/constants');
const allowedCors = [
  'https://frontend.mesto.students.nomoredomains.xyz',
  'http://frontend.mesto.students.nomoredomains.xyz',
  'localhost:3000',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const DB_CONN = 'mongodb://localhost:27017/mestodb';

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_CONN, {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS, 'Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }
  next();
});

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
});

app.use(requestLogger);

// app.use(helmet());
// app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(signup);
app.use(signin);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardsRouter);

app.use((req, res, next) => {
  Promise.reject(new FoundError('Ресурс не найден!'))
    .catch(next);
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  if (!err.statusCode) {
    res.status(500).send({ message: 'Неизвестная ошибка сервера!' });
  }
  next();
});

app.listen(PORT);
