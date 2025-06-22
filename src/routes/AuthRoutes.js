const {Signup,Login,Logout,RefreshToken} = require('../controllers/AuthController');

const express = require('express');

const AuthRouter = express.Router();


AuthRouter.post('/signup',Signup);

AuthRouter.post('/login',Login);

AuthRouter.get('/refresh',RefreshToken);

AuthRouter.post('/logout',Logout);

module.exports = AuthRouter;