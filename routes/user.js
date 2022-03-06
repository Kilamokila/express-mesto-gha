const express = require('express');
const { celebrate } = require('celebrate');
const { joiUserIdScheme, joiUserAvatarScheme, joiUserInfoScheme } = require('../utils/validator');
const {
  getUsers, getUserById, getCurrentUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/user');

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:userId', celebrate(joiUserIdScheme), getUserById);
userRouter.patch('/me', express.json(), celebrate(joiUserInfoScheme), updateUserInfo);
userRouter.patch('/me/avatar', express.json(), celebrate(joiUserAvatarScheme), updateUserAvatar);

module.exports = { userRouter };
