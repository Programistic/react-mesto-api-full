require('dotenv').config();
const express = require('express');
// const helmet = require('helmet');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./utils/constants');
const router = require('./routes/index');
/*
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const signup = require('./routes/signup');
const signin = require('./routes/signin');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
*/
const cors = require('./middlewares/cors');

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

app.use(router);

/*
app.use(signup);
app.use(signin);
app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use((req, res, next) => {
  Promise.reject(new NotFoundError('Ресурс не найден!'))
    .catch(next);
});
*/

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка!' : err.message;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT);
