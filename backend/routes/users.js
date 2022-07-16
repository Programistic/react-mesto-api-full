const userRouter = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const { URLPattern } = require('../utils/constants');

const {
  getAllUsers,
  getCurrentUser,
  getUserById,
  getUserByIdAndUpdate,
  getUserByIdAndUpdateAvatar,
} = require('../controllers/users');

userRouter.get('/', getAllUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get(
  '/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  }),
  getUserById,
);
userRouter.patch(
  '/me',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  getUserByIdAndUpdate,
);
userRouter.patch(
  '/me/avatar',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      avatar: Joi.string().pattern(URLPattern),
    }),
  }),
  getUserByIdAndUpdateAvatar,
);

module.exports = userRouter;
