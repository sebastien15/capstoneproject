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


const index = (req,res)=>{
    try {
        Contact.find().then(result=>res.send(result));
    } catch (err) {
        console.log(err.message)
    }
}

const saveContact = async (req,res)=>{
    const {firstName,lastName,email,message} = req.body;
    try {
        const contact = await Contact.create({firstName,lastName,email,message});
        res.send(contact)
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors})
    }
}

const deleteContact = (req,res)=>{
    const contactId = req.params.id;
    try {
        Contact.findByIdAndDelete(contactId).then(result=>{res.json({ redirect:'/'})});
    } catch (err) {
        res.send(err)
    }
}
module.exports = {
    index,
    saveContact,
    deleteContact
};