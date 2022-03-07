const { Joi } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;
const BadRequestError = require('../errors/BadRequestError');

exports.joiCardScheme = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((value) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      throw new BadRequestError('Формат ссылки некорректен');
    }),
  }),
};

exports.joiCardIdScheme = {
  params: Joi.object().keys({
    cardId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
};

exports.joiUserAvatarScheme = {
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      throw new BadRequestError('Формат ссылки некорректен');
    }),
  }),
};

exports.joiUserIdScheme = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
};

exports.joiUserInfoScheme = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
};

exports.joiSignUpScheme = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      throw new BadRequestError('Формат ссылки некорректен');
    }),
  }),
};

exports.joiSignInScheme = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
};
