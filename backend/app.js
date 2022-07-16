const express = require('express');
const helmet = require('helmet');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./utils/constants');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const signup = require('./routes/signup');
const signin = require('./routes/signin');
const auth = require('./middlewares/auth');

const FoundError = require('./errors/FoundError');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
