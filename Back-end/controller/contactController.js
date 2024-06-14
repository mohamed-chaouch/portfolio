const Contact = require("../model/Contact");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require('dotenv').config();

// Create a nodemailer transporter to send emails.
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false, // true for 465, false for other ports
    auth: {
        type: "login", // default
        user: process.env.USER, // Your email address
        pass: process.env.PASSWORD, // Your app password
    },
    tls: {
      // Disable strict TLS checks
      rejectUnauthorized: false,
    },
});

// Function to send email reminders
async function sendEmail(from, to, subject, text) {
try {
    let info = await transporter.sendMail({
    from: from,
    to: to,
    subject: subject,
    text: text,
    });
    console.log("Email sent: " + info.response);
} catch (error) {
    console.error("Error sending email:", error);
//   throw error; // rethrow the error to handle it in calling function
}
}

exports.createContact = async (req, res) =>{
    try{
        const data = req.body;

        if(!data.firstName){
            return res.status(400).send('First Name is required');
        }
        if(!data.lastName){
            return res.status(400).send('Last Name is required');
        }
        if(!data.email){
            return res.status(400).send('Email is required');
        }
        if(!data.description){
            return res.status(400).send('Description is required');
        }

        const contact = new Contact(data);
        if(!contact){
            return res.status(404).send('Contact not found');
        }

        await contact.save();

        // Send email notifications
        sendEmail(
            contact.email,
            "mohamedchaouch2212@gmail.com",
            "Contact",
            `New Person with the name ${contact.firstName} ${contact.lastName} Contacted you`,
        );

        res.status(200).send(contact);

    }catch(err){
        res.status(500).send({ message: err.message });
    }
}


exports.updateContact = async (req, res)=>{
    try{
        const newData = req.body;

        if(!mongoose.Types.isValidObjectId(req.params.id)){
            return res.status(404).send('Id Invalid');
        }

        if(newData.firstName?.length < 2 ){
            return res.status(400).send('First Name Should be at least 2 characters');
        }

        if(newData.lastName?.length <2 ){
            return res.status(400).send('Last Name Should be at least 2 characters');
        }

        if(!newData.email){
            return res.status(400).send('Email is required');
        }

        if(!newData.description?.length < 10){
            return res.status(400).send('Description should be at least 10 characters');
        }

        const contactUpdated = await Contact.findByIdAndUpdate(req.params.id, newData, { new: true })
        if(!contactUpdated){
            return res.status(404).send('Contact not found');
        }

        res.status(200).send(contactUpdated);


    }catch(err){
        res.status(500).send({ message: err.message });
    }
}

exports.deleteContact = async (req, res) => {
    try{
        if(!mongoose.Types.isValidObjectId(req.params.id)){
            return res.status(404).send('Id Invalid');
        }

        const contactDeleted = await Contact.findByIdAndDelete(req.params.id);
        if(!contactDeleted){
            return res.status(404).send('Contact deleted');
        }
    }catch(err){
        res.status(500).send({ message: err.message });
    }
}

exports.getAllContacts = async (req, res) => {
    try{
        const contacts = await Contact.find();
        if(!contacts){
            return res.status(404).send('Contacts not found');
        }
        res.status(200).send(contacts);
    }catch(err){
        res.status(500).send({ message: err.message });
    }
}

exports.getContact = async (req, res)=>{
    try{
        if(!mongoose.Types.isValidObjectId(req.params.id)){
            return res.status(404).send('Id Invalid');
        }

        const contact = await Contact.findById(req.params.id);
        if(!contact){
            return res.status(404).send('Contact not found');
        }
        res.status(200).send(contact);
    }catch(err){
        res.status(500).send({ message: err.message });
    }
}