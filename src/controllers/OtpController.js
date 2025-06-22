const {GenerateOtp} = require('../utils/OtpUtil');

const {sendOtp} = require('../utils/Mailer');

const User = require('../models/User');
const { RSC_MODULE_TYPES } = require('next/dist/shared/lib/constants');

const SendOtp = async(req,res) => {
    try{

       const {email} = req.body;

       if(!email){
        return res.status(400).json({error:"Enter email for otp !"})
       }

       const user = await User.findOne({email});

       if(!user){
        return res.status(404).json({error:"This user does not exists !"})
       }

       const {otp,otpExpiry} = GenerateOtp();

       user.otp = otp;

       user.otpExpiry=otpExpiry;

       await user.save();

       await sendOtp(email,otp);
      
       res.status(200).json({
        message:"Otp Sent to User Successfully !"
       })

    }
    catch(err){
        res.status(500).json({error:"Failed to send OTP !"})
    }
}


const VerifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) return res.status(400).json({ error: "All fields required!" });

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found!" });

    if (user.isVerified) {
      return res.status(400).json({ error: "User already verified." });
    }

    if (user.otp !== otp) {
      return res.status(401).json({ error: "Invalid OTP!" });
    }

    if (Date.now() > user.otpExpiry) {
      return res.status(410).json({ error: "OTP expired!" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.status(200).json({ message: "User verified successfully!" });

  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {SendOtp,VerifyOtp};