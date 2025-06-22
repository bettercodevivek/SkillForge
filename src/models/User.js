const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    otp:String,
    otpExpiry:Date
},{timestamps:true});

UserSchema.pre('save',async function(next){
    const user = this;
    const saltRounds = 10;

    try{
        if(!user.isModified('password')) return next();

        const hashedPwd = await bcrypt.hash(user.password,saltRounds);

        user.password = hashedPwd;

        next();
    }
    catch(err){
        next(err);
    }
});

UserSchema.methods.comparePassword = async function (candidatePwd) {
    return await bcrypt.compare(candidatePwd, this.password);
};

const User = mongoose.model('User',UserSchema);

module.exports = User;