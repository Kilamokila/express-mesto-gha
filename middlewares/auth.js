const jwt = require('jsonwebtoken');
const AuthError = require('./errorHandler');

const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const cookieToken = req.cookies.userToken;
  if (!cookieToken) {
    next(new AuthError('Необходима авторизация'));
  }
  let payload;
  try {
    payload = jwt.verify(cookieToken, JWT_SECRET);
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};

module.exports = { auth };
