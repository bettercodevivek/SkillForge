const {Signup,Login,Logout,RefreshToken} = require('../controllers/AuthController');

const {SendOtp,VerifyOtp} = require('../controllers/OtpController')

const express = require('express');

const AuthRouter = express.Router();


AuthRouter.post('/signup',Signup);

AuthRouter.post('/login',Login);

AuthRouter.get('/refresh',RefreshToken);

AuthRouter.post('/logout',Logout);

AuthRouter.post('/send-otp',SendOtp);

AuthRouter.post('/verify-otp',VerifyOtp);

module.exports = AuthRouter;