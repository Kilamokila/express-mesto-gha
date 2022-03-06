const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const AuthError = require('../errors/AuthError');

exports.updateUserInfo = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  if (!name || !about) {
    next(new BadRequestError('Поля "name" и "about" должно быть заполнены'));
  }
  return User.findByIdAndUpdate(userId, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then(res.status(200))
    .then((newUserInfo) => res.send({ data: newUserInfo }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

exports.updateUserAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  if (!avatar) {
    next(new BadRequestError('Поле "avatar" должно быть заполнено'));
  }
  return User.findByIdAndUpdate(userId, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then(res.status(200))
    .then((newUserAvatar) => res.send({ data: newUserAvatar }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

exports.getUsers = (req, res, next) => {
  User.find({})
    .then(res.status(200))
    .then((users) => res.send({ data: users }))
    .catch(next);
};

exports.getCurrentUser = (req, res, next) => {
  const currentUserId = req.user;
  if (!currentUserId) {
    next(new AuthError('Ошибка авторизации'));
  }
  return User.findById(currentUserId)
    .then((user) => res.status(200).send(user))
    .catch(next);
};

exports.getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (user) {
      res.status(200).send(user);
    } else {
      next(new NotFoundError(`Пользователь с id: ${userId} не обнаружен`));
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Некорректные данные'));
    } else {
      next(err);
    }
  }
};
