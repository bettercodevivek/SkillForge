require('dotenv').config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
});

exports.sendOtp = async(to,otp) => {
  
   const MailOptions = {
    from:process.env.EMAIL_USER,
    to,
    subject:'Your OTP for SkillForge Website !',
    html:`<p> Your OTP is : <b> ${otp} </b>. This OTP is valid for only 5 minutes </p>`
   }

   await transporter.sendMail(MailOptions);

}

