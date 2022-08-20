const jwt = require('jsonwebtoken');
const { handleAuthError } = require('../errors/errors');

const { JWT_KEY, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    handleAuthError();
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_KEY : '123');
  } catch (err) {
    handleAuthError();
    return;
  }
  req.user = payload;
  next();
};
