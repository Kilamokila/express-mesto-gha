const Card = require('../models/card');

const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');

exports.addCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then(res.status(201))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

exports.getCards = (req, res, next) => {
  Card.find({})
    .then(res.status(200))
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

exports.deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const { owner } = req.user._id;
    const card = await Card.findById(cardId);
    if (!card) {
      return next(new NotFoundError(`Карточка с id: ${cardId} не обнаружена на сервере`));
    }
    if (!card.owner.equals(req.user._id)) {
      return next(new ForbiddenError('Чужую карточку удалить невозможно.'));
    }
    const removedCard = await Card.findByIdAndRemove(cardId);
    if (!removedCard) {
      return next(new NotFoundError('Передан неверный айди карточки, поэтому не получилось удалить.'));
    }
    res.send(removedCard);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Невалидный id'));
    } else {
      next(err);
    }
  }
};

exports.deleteCardLike = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    if (card) {
      await Card.findByIdAndUpdate(
        cardId,
        { $pull: { likes: req.user } },
        { new: true },
      );
      res.status(200).send(card);
    } else {
      next(new NotFoundError(`Карточка с id: ${cardId} не обнаружена на сервере`));
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Невалидный id'));
    } else {
      next(err);
    }
  }
};

exports.putCardLike = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    if (card) {
      await Card.findByIdAndUpdate(
        cardId,
        { $addToSet: { likes: req.user } },
        { new: true },
      );
      res.status(200).send(card);
    } else {
      next(new NotFoundError(`Карточка с id: ${cardId} не обнаружена на сервере`));
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Невалидный id'));
    } else {
      next(err);
    }
  }
};
