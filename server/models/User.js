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
// fire a function after doc saved to db
userSchema.post('save', function(doc,next){
    console.log('new user was created and saved',doc);
    next();
})

//fire a function before doc saved to db
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    console.log("user about to be created and saved", this.password);
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