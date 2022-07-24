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

const options = {
  origin: [
    'http://localhost:3000',
    'https://praktikum.tk',
    'http://praktikum.tk',
    'https://frontend.mesto.students.nomoredomains.xyz',
    'http://frontend.mesto.students.nomoredomains.xyz',
  ],
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

module.exports = {
  URLPattern,
  limiter,
  requestLogFilename,
  errorLogFilename,
  options,
};
