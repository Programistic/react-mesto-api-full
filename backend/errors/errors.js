const NotFoundError = require('./NotFoundError');
const AuthError = require('./AuthError');
const RequestError = require('./RequestError');
const ConflictError = require('./ConflictError');
const UnauthRequestError = require('./UnauthRequestError');

const handleCardFound = (card, res) => {
  if (!card) {
    throw new NotFoundError('Карточка не найдена!');
  } else {
    res.send({ card });
  }
};

const handleDeleteCardFound = (card) => {
  if (!card) {
    throw new NotFoundError('Удаляемая карточка не найдена!');
  }
};

const handleCheckCardOwner = (card, req) => {
  if (req.user._id !== card.owner.toString()) {
    throw new UnauthRequestError('Удалить карточку может только её владелец!');
  }
};

const handleUserFound = (user, res) => {
  if (!user) {
    throw new NotFoundError('Пользователь не найден!');
  } else {
    res.send({ user });
  }
};

const handleConflictError = (err, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    throw new RequestError('Переданы некорректные данные!');
  } else if (err.code === 11000 || err.name === 'MongoError') {
    throw new ConflictError('Email уже существует!');
  } else {
    next(err);
  }
};

const handleAuthError = () => {
  throw new AuthError('Необходима авторизация!');
};

const handleError = (err, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    throw new RequestError('Переданы некорректные данные!');
  } else {
    next(err);
  }
};

module.exports = {
  handleCardFound,
  handleDeleteCardFound,
  handleCheckCardOwner,
  handleUserFound,
  handleConflictError,
  handleAuthError,
  handleError,
};
