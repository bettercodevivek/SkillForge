
const RoleMiddleware = (...allowedRoles) => {
     return (req,res,next)=>{
        try{
           const userRole = req.user.role;

           if(!userRole || !allowedRoles.includes(userRole)){
            return res.status(403).json({error:"Access Denied : Insufficient Permissions !"})
           }
          
           next();
        }
        catch(err){
          return res.status(500).json({error:"Internal Server Error (Role Check)"})
        }
     }
}

module.exports = RoleMiddleware;