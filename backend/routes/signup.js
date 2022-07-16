const signup = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const { URLPattern } = require('../utils/constants');
const { createUser } = require('../controllers/users');

signup.post(
  '/signup',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(URLPattern),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

module.exports = signup;
