const express = require('express');

const {
  getUsers, getUserById, addUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/user');

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserById);
userRouter.post('/', express.json(), addUser);
userRouter.patch('/me', express.json(), updateUserInfo);
userRouter.patch('/me/avatar', express.json(), updateUserAvatar);

module.exports = { userRouter };
