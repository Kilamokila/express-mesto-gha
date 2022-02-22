const User = require('../models/user');

exports.addUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(res.status(201))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректные данные' });
      }
      res.status(500).send({ message: err.message });
    });
};

exports.updateUserInfo = (req, res) => {
  const { userId } = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userId, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then(res.status(201))
    .then((newUserInfo) => res.send({ data: newUserInfo }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректные данные' });
      }
      res.status(500).send({ message: err.message });
    });
};

exports.updateUserAvatar = (req, res) => {
  const { userId } = req.user._id;
  const { avatar } = req.body.avatar;
  User.findByIdAndUpdate(userId, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then(res.status(201))
    .then((newUserAvatar) => res.send({ data: newUserAvatar }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректные данные' });
      }
      res.status(500).send({ message: err.message });
    });
};

exports.getUsers = (req, res) => {
  User.find({})
    .then(res.status(200))
    .then((users) => res.send({ data: users }));
};

exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: `Пользователь с id: ${userId} не обнаружен` });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Некорректные данные' });
    }
    res.status(500).send({ message: err.message });
  }
};
