const { allowedCors } = require('../utils/constants');
const { defaultAllowedMethods } = require('../utils/constants');

module.exports = (req, res, next) => {
  /*
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', '*');
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', defaultAllowedMethods);
    res.header('Access-Control-Allow-Headers', requestHeaders);
  }
  */

  const { origin } = req.headers;
  console.log('origin = ' + origin);
  
  res.header('Access-Control-Allow-Origin', '*');
  next();
};
