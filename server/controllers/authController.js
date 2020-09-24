const User = require('../models/user')

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

const signup_get = (req,res) =>{
    // res.render('signup')
}
const signup_post = async (req,res) =>{
    // res.render('signup')
    const {email,password,name,role} = req.body
    try{
        const user = await User.create({email, password,name,role});
        const authToken = await user.generateAuthToken();
        res.status(201).json(authToken);
        res.send({
            user: user,
            authToken:authToken
        });
    }catch (err){
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}
const login_get = (req,res) =>{
}
const login_post = async (req,res) =>{
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