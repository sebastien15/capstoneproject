const Contact = require('../models/Contact');

const handleErrors = (err)=>{
    let errors = {firstName:'',lastName:'',email:'',message:''};

    //validation errors
    if(err.message.includes('contact validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        });
        return errors;
    }
}

const saveContact = async (req,res)=>{
    const {firstName,lastName,email,message} = req.body;
    // console.log(firstName,lastName,email,message)

    try {
        const contact = await Contact.create({firstName,lastName,email,message});
        res.send(contact)
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors})
    }
}

module.exports = {
    saveContact
};