const mongoose = require('mongoose');
const schema = mongoose.Schema;
const {isEmail} = require('validator');

const contactSchema = new schema({
    firstName: {
        type: String,
        required: ['true','Please Enter First name!']
    },
    lastName: {
        type: String,
        required: ['true','Please Enter LastName!']
    },
    email: {
        type: String,
        required: ['true','Please Enter Email!'],
        lowercase: true,
        validate: [isEmail,'Please enter a valid email']
    },
    message: {
        type: String,
        required: ['true','Please Enter message!'],
        minlength: [20,'Please Message should be more than 20 characters!']
    }
})

const Contact = mongoose.model('contact',contactSchema);

module.exports = Contact;