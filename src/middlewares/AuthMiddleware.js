require('dotenv').config();

const jwt = require('jsonwebtoken');

const AuthMiddleware =  async(req,res,next) => {
    try{
       const authHeader = req.headers.authorization;

       if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({error:"Token Invalid or does not exists !"})
       }

       const token = authHeader.split(' ')[1];

       const verifiedUser = jwt.verify(token,process.env.ACCESS_KEY);

       req.user = verifiedUser;

       next();
    }
    catch(err){
       return res.status(401).json({error:"Invalid or Expired Token !"})
    } 
}

// next(err) should not be used in authmiddleware, but in other ones can be used, that too onky when there is a global error handling middleware in our code

module.exports = AuthMiddleware;