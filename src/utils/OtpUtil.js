exports.GenerateOtp = () => {

    const otp = Math.floor(100000 + Math.random() * 900000);
    
    const otpExpiry = Date.now() + 5*60*1000;

    return {otp,otpExpiry}

}
