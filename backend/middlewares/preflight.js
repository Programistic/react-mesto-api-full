const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const allowedCors = [
  'https://frontend.mesto.students.nomoredomains.xyz',
  'http://frontend.mesto.students.nomoredomains.xyz',
  'https://localhost:3000',
  'http://localhost:3000',
];

module.exports = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
  }
  res.header('Access-Control-Allow-Origin', origin);

  next();
};
