// Here we will write 2 handler functions : 
// 1. for accessing logged in user profile
// 2. for updating user profile

const User = require('../models/User');

const GetProfile = async(req,res) => {
    try{
      const {userId} = req.user;

      const Profile = await User.findById(userId);

      if(!Profile){
        return res.status(409).json({error:"User doesn't exist"});
      }

      res.status(200).json({
        message:"User Profile Fetched Successfully !",
        Profile:{
            username:Profile.username,
            email:Profile.email,
            role:Profile.role
        }
      });

    }
    catch(err){
         res.status(500).json({error:"Internal Server Error !"})
    }
}



const UpdateProfile = async(req,res) => {
    try{

      const {userId} = req.user;

      const {username,email,password} = req.body;

      const user = await User.findById(userId);

      if(!user){
        return res.status(404).json({error:"User Not Found !"})
      }

      if(username) user.username = username;

      if(email) user.email = email;

      if(password) user.password = password;

      await user.save();


     res.status(201).json({
        message:"User Successfully Updated !"
     })

    }
    catch(err){
        res.status(500).json({error:"Internal Server Error !"})
    }
}

// Here, we havent used findByIdAndUpdate()  because, then the password wont be hashed and will be saved as a plain text.
// In our UserModel, we have written a pre-middleware and it gets triggered only on 'save', which means when save() is used
// so findByIdAndUpdate() will directly run an update query without applying save(), therefore no hashing of password.
// so, for hashing of password we need to find user by Id and then manually update all details and save 


module.exports =  {GetProfile,UpdateProfile};