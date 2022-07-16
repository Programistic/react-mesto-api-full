const cardRouter = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const { URLPattern } = require('../utils/constants');

const {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getAllCards);
cardRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(URLPattern),
    }),
  }),
  createCard,
);
cardRouter.delete(
  '/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  }),
  deleteCardById,
);
cardRouter.put(
  '/:_id/likes',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  }),
  likeCard,
);
cardRouter.delete(
  '/:_id/likes',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  }),
  dislikeCard,
);

module.exports = cardRouter;
