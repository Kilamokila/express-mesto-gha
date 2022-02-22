const Card = require('../models/card');

exports.addCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then(res.status(201))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректные данные' });
      }
      res.status(500).send({ message: err.message });
    });
};

exports.getCards = (req, res) => {
  Card.find({})
    .then(res.status(200))
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    if (card) {
      const deletedCard = await Card.findByIdAndRemove(cardId);
      res.send(deletedCard);
    } else {
      res.status(404).send({ message: `Карточка с id: ${cardId} не обнаружена на сервере` });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Невалидный id ' });
    }
    res.status(500).send({ message: err.message });
  }
};

exports.deleteCardLike = async (req, res) => {
  try {
    const { cardId } = req.user._id;
    const card = await Card.findById(cardId);
    if (card) {
      await Card.findByIdAndUpdate(
        cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true },
      );
      res.status(200).send(card);
    } else {
      res.status(404).send({ message: `Карточка с id: ${cardId} не обнаружена на сервере ` });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Невалидный id ' });
    }
    res.status(500).send({ message: err.message });
  }
};

exports.putCardLike = async (req, res) => {
  try {
    const { cardId } = req.user._id;
    const card = await Card.findById(cardId);
    if (card) {
      await Card.findByIdAndUpdate(
        cardId,
        { $pull: { likes: req.user._id } },
        { new: true },
      );
      res.status(200).send(cardId);
    } else {
      res.status(404).send({ message: `Карточка с id: ${cardId} не обнаружена на сервере ` });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Невалидный id ' });
    }
    res.status(500).send({ message: err.message });
  }
};
