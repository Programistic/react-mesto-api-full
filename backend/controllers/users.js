const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { handleUserFound, handleError, handleConflictError } = require('../errors/errors');
const AuthError = require('../errors/AuthError');

const { JWT_KEY, NODE_ENV } = process.env;

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ user }))
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hashPassword) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hashPassword,
    }))
    .then((user) => res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      handleConflictError(err, next);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { _id } = req.params;
  User.findById(_id)
    .then((user) => {
      handleUserFound(user, res);
    })
    .catch((err) => {
      handleError(err, next);
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      handleUserFound(user, res);
    })
    .catch(next);
};

const getUserByIdAndUpdate = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      handleUserFound(user, res);
    })
    .catch((err) => {
      handleError(err, next);
    })
    .catch(next);
};

const getUserByIdAndUpdateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      handleUserFound(user, res);
    })
    .catch((err) => {
      handleError(err, next);
    })
    .catch(next);
};

/*
const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password') //  идентификация по почте
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильная почта или пароль!');
      } else {
        bcrypt.compare(password, user.password) //  аутентификация
          .then((matched) => {
            if (!matched) {
              throw new AuthError('Неправильная почта или пароль!');
            } else {
              const token = jwt.sign(
                { _id: user._id },
                JWT_KEY,
                { expiresIn: '7d' },
              );
              res.send({ message: 'Успешная авторизация!', token });
            }
          });
      }
      res.send({ message: 'Неудачная авторизация!' });
    })
    .catch(() => {
      throw new AuthError('Ошибка авторизации!');
    })
    .catch(next);
};
*/

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильная почта или пароль!');
      } else {
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_KEY : '123',
          { expiresIn: '7d' },
        );
        res.send(token);
      }
    })
    .catch(next);
};

module.exports = {
  getAllUsers,
  getCurrentUser,
  createUser,
  getUserById,
  getUserByIdAndUpdate,
  getUserByIdAndUpdateAvatar,
  login,
};
