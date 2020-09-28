const User = require('../models/user')
import jwt, { decode } from 'jsonwebtoken'
import 'dotenv/config'

const handleErrors = (err)=>{
    console.log(err.message, err.code);
    let errors = {email: '', password: ''};

    //duplicate error code
    if(err.code == 11000){
        errors.email = "that email is already registered";
        return errors
    }
    //validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        });
        return errors;
    }
}
const maxAge =1*24*60*60;

const createToken = (id)=>{
    return jwt.sign(
        {id},
        process.env.JWT_SECRET_KEY,{
        expiresIn: maxAge
    })
}
const signup_get = (req,res) =>{
    // res.render('signup')
}
const signup_post = async (req,res) =>{
    const {email,password,name,role} = req.body
    try{
        const user = await User.create({email, password,name,role});
        // const authToken = await user.generateAuthToken();
        const token = createToken(user._id); 
        res.cookie('jwt',token,{ httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({
            user: user._id
        });
    }catch (err){
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}
const login_get = (req,res) =>{
    // res.render('signup')
}
const login_post = async (req,res) =>{
    // res.render('signup')
    res.send('logged in')
}

const logout = (req,res) =>{
    // res.render('signup')
}

module.exports= {
    signup_get,
    signup_post,
    login_get,
    login_post,
    logout

}