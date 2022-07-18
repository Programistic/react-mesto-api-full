const URLPattern = /^(https?:\/\/)(www\.)?[a-z\d\D]*/;

const rateLimit = require('express-rate-limit');
const appRoot = require('app-root-path');

const requestLogFilename = `${appRoot}/logs/request.log`;
const errorLogFilename = `${appRoot}/logs/error.log`;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const allowedCors = [
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
];

const defaultAllowedMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  URLPattern,
  limiter,
  requestLogFilename,
  errorLogFilename,
  allowedCors,
  defaultAllowedMethods,
};
