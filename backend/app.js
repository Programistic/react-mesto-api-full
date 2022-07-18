require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./utils/constants');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const signup = require('./routes/signup');
const signin = require('./routes/signin');
const auth = require('./middlewares/auth');

const FoundError = require('./errors/FoundError');

const { PORT = 3001, DB_CONN } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_CONN, {
  useNewUrlParser: true,
});

const corsOptions = {
  origin: [
    'https://praktikum.tk',
    'http://praktikum.tk',
    'https://frontend.mesto.students.nomoredomains.xyz',
    'https://frontend.mesto.students.nomoredomains.xyz/signin',
    'https://frontend.mesto.students.nomoredomains.xyz/signup',
    'https://frontend.mesto.students.nomoredomains.xyz/users/me',
    'https://frontend.mesto.students.nomoredomains.xyz/cards',
    'http://frontend.mesto.students.nomoredomains.xyz',
    'http://frontend.mesto.students.nomoredomains.xyz/signin',
    'http://frontend.mesto.students.nomoredomains.xyz/signup',
    'http://frontend.mesto.students.nomoredomains.xyz/users/me',
    'http://frontend.mesto.students.nomoredomains.xyz/cards',
    'localhost:3000',
  ],
  credentials: true,
};

app.use('*', cors(corsOptions));

app.use(requestLogger);

app.use(helmet());
app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(signup);
app.use(signin);
app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardsRouter);

app.use(errorLogger);

app.use(errors());

app.use((req, res, next) => {
  Promise.reject(new FoundError('Ресурс не найден!'))
    .catch(next);
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
  next();
});

app.listen(PORT);
