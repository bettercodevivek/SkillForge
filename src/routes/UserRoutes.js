const {GetProfile,UpdateProfile} = require('../controllers/UserController');

const AuthMiddleware = require('../middlewares/AuthMiddleware')

const express = require('express');

const UserRouter = express.Router();

UserRouter.get('/profile',AuthMiddleware,GetProfile);

UserRouter.put('/profile',AuthMiddleware,UpdateProfile);

module.exports = UserRouter;