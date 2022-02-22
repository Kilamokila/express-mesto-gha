const express = require('express');

const cardRouter = require('express').Router();

const {
  getCards, deleteCard, addCard, deleteCardLike, putCardLike,
} = require('../controllers/card');

cardRouter.get('/', getCards);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.post('/', express.json(), addCard);
cardRouter.put('/:cardId/likes', putCardLike);
cardRouter.delete('/:cardId/likes', deleteCardLike);

module.exports = { cardRouter };
