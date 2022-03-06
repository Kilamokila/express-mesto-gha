const express = require('express');
const { celebrate } = require('celebrate');
const cardRouter = require('express').Router();
const { joiCardIdScheme, joiCardScheme } = require('../utils/validator');
const {
  getCards, deleteCard, addCard, deleteCardLike, putCardLike,
} = require('../controllers/card');

cardRouter.get('/', getCards);
cardRouter.delete('/:cardId', celebrate(joiCardIdScheme), deleteCard);
cardRouter.post('/', express.json(), celebrate(joiCardScheme), addCard);
cardRouter.put('/:cardId/likes', celebrate(joiCardIdScheme), putCardLike);
cardRouter.delete('/:cardId/likes', celebrate(joiCardIdScheme), deleteCardLike);

module.exports = { cardRouter };
