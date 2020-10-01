import jwt from "jsonwebtoken";
import "dotenv/config"

const requireAuth = (req,res,next)=>{
    //check json web token exists and is varid
    const token = req.header('Authorization').replace('Bearer ', '')

    if(token){
        jwt.verify(token, process.env.JWT_SECRET_KEY,
            (err, decodedToken) =>{
                if (err) {
                    res.send('invalid token');
                    return
                }else{
                    return
                }
            })
    }else{
        res.status(403).json({"err":"not logged in"});
        return
    }
next();
}

module.exports = {requireAuth};