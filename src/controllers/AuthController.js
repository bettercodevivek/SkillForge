// Here, we will write all the handler functions for Auth Routes

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { response } = require('../app');


// Signup Handler

const Signup = async(req,res) => {
    try{
      const {username,email,password} = req.body;

      if(!username || !email || !password){
        return res.status(400).json({error:"All Credentials are necessary to be filled !"})
      }

      const userExists = await User.findOne({email});

      if(userExists){
        return res.status(409).json({error:"This user already exists, please login instead !"})
      }

      const newUser = new User({username,email,password});

      await newUser.save();

      res.status(201).json({
        message:"New User Created Successfully !",
        user:{
            username:newUser.username,
            email:newUser.email,
            userId:newUser._id
        }
      })
    }
    catch(err){
        res.status(500).json({error:"Internal Server Error !"})
    }
}

// Login handler 

const Login = async(req,res) => {
    try{
      const {email,password} = req.body;

      if(!email || !password){
        return res.status(400).json({error:"Enter both email and password !"})
      }
      
      const user = await User.findOne({email});

      if(!user){
        return res.status(402).json({error:'This user does not exist, please signup first !'})
      }

      const isMatch = await user.comparePassword(password);

      if(!isMatch){
        return res.status(402).json({error:"Invalid Password !"})
      }

      const payLoad = {
        username:user.username,
        email:user.email,
        userId:user._id
      }

      const accessToken = jwt.sign(payLoad,process.env.ACCESS_KEY,{expiresIn:'5m'});

      const refreshToken = jwt.sign(payLoad,process.env.REFRESH_KEY,{expiresIn:'7d'});

      res.cookie('refreshToken',refreshToken,{
        httpOnly:true,
        sameSite:'strict',
        maxAge:7*24*60*1000
      });

      res.status(200).json({
        message:"Login Successful !",
        token:accessToken
      })

    }
    catch(err){
       res.status(500).json({error:"Internal Server Error !"});
    }
}

// RefreshToken Handler

const RefreshToken = async(req,res) => {
    try{

     const {refreshToken} = req.cookies;

     if(!refreshToken){
        return res.status(400).json({error:"Refresh Token not found !"});
     }

     const decoded = jwt.verify(refreshToken,process.env.REFRESH_KEY);

     const payLoad = {
        username:decoded.username,
        email:decoded.email,
        userId:decoded.userId
     }

     const accessToken = jwt.sign(payLoad,process.env.ACCESS_KEY,{expiresIn:'5m'});

     res.status(200).json({
        message:"Token Refreshed Successfully !",
        token:accessToken
     })

    }
    catch(err){
        res.status(500).json({error:"Internal Server Error !"})
    }
}

// Logout Controller 

const Logout = async(req,res) => {
    try{
       res.clearCookie('refreshToken',{
        httpOnly:true,
        sameSite:'strict'
       });
       res.status(200).json({message:"Logout Successful !"})
    }
    catch(err){
       res.status(500).json({error:"Internal Server Error !"})
    }
}


module.exports = {Signup,Login,RefreshToken,Logout}