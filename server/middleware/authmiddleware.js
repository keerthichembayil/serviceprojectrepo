const jwt=require('jsonwebtoken');
const User=require("../models/User");
const protect = async (req, res, next) => {
  
    let token;
  
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
       
      try {
        console.log("entered user middleware");
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
     
        req.user = await User.findById(decoded.userId).select("-password");
        console.log(req.user);

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
        if(req.user&&req.user.role!==role){
            return res.status(403).json({message:"acess denied role is not correct"});
        }
        console.log("authorized as client");
        next();
    }
}
module.exports={protect,authorize};

// Token Verification Doesn't Guarantee req.user: The presence of a token only means that a token was sent in the request. The token might be invalid or expired, or the user associated with that token might no longer exist in the database (e.g., the user was deleted).
//because ofthat req.user is checked here we can decode userrole in above code and check for authorization
//but not done in that manner