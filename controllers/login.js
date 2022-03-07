const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AuthError = require('../errors/AuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
      res.cookie('userToken', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      }).send('Вход выполнен');
    })
    .catch(next(new AuthError('Ошибка входа')));
};

module.exports = { login };
