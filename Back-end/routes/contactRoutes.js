const express = require('express');
const router = express.Router();
const {createContact, getAllContacts, getContact, updateContact, deleteContact} = require("../controller/contactController");

router.post('/create-contact', createContact);
router.get('/get-contacts', getAllContacts);
router.get('/get-contact/:id', getContact);
router.put("/update-contact/:id", updateContact);
router.delete("/delete-contact/:id", deleteContact);

module.exports = router;