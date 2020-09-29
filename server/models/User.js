const { uniqueId } = require('lodash');
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const {isEmail} = require('validator')
import jwt from 'jsonwebtoken';
import "dotenv/config";
import bcrypt from 'bcrypt';

const userSchema = new schema({
    email: {
        type: String,
        required: [true, "please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail,'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, "please enter an email"],
        minlength: [6, "minimum passoword length is 6 characters"]
    },
    name:{
        type: String,
        required: [true, "Please enter your name"]
    },
    role:{
        type: String,
        required: true,
        default: "subscriber"
    }

});

// login user with static method
userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email});
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if(auth) {
          return user;
      }
      throw Error('incorrect password');
    } 
    throw Error('incorrect email');
}

// fire a function after doc saved to db
userSchema.post('save', function(doc,next){
    next();
})

//fire a function before doc saved to db
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const accessToken = await jwt.sign(
        { _id: user._id, email: user.email }, process.env.JWT_SECRET_KEY);
    return accessToken;
}

const User = mongoose.model('user', userSchema);

module.exports = User;