const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors/AuthError');

const { JWT_KEY, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError('Необходима авторизация!'));
    return;
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_KEY : '123');
  } catch (err) {
    next(new AuthError('Необходима авторизация!'));
    return;
  }

  req.user = payload;

  next();
};
