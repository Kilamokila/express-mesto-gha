const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const { JWT_SECRET = 'dev-secret' } = process.env;

const auth = (req, res, next) => {
  const cookieToken = req.cookies.userToken;
  if (!cookieToken) {
    return next(new AuthError('Необходима авторизация'));
  }
  let payload;
  try {
    payload = jwt.verify(cookieToken, JWT_SECRET);
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

module.exports = { auth };
