const mongoose = require('mongoose');

const schemaContact = new mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
})

const Contact = mongoose.model('Contact', schemaContact, "contacts" , {strict: false});
module.exports = Contact;