const jwt=require('jsonwebtoken');
const Admin=require("../models/Admin");
const protect = async (req, res, next) => {
  
    let token;
  
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
       
      try {
        console.log("entered adminmiddleware");
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
     
        req.admin = await Admin.findById(decoded.adminId).select("-password");
        console.log("req.admin",req.admin);

       //attching user object with userid decoded from token ie (userId set while logging)
      

        next();
      } catch (error) {
        res.status(401).json({ message: "Not authorized, token failed" });
      }
    } else {
      res.status(401).json({ message: "No token, authorization denied" });
    }
  };

 


  const authorize=(role)=>{
    return(req,res,next)=>{
        if(req.admin&&req.admin.role!==role){
            return res.status(403).json({message:"acess denied role is not admin"});
        }
        next();
    }
}
module.exports={protect,authorize};

// Token Verification Doesn't Guarantee req.user: The presence of a token only means that a token was sent in the request. The token might be invalid or expired, or the user associated with that token might no longer exist in the database (e.g., the user was deleted).
//because ofthat req.user is checked here we can decode userrole in above code and check for authorization
//but not done in that manner