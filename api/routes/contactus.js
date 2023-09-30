const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ContactUsForm = require('./model/contactus');

router.post('/', (req, res, next) => {
    const { name, phoneNumber, email, query } = req.body;

    if (!name && !phoneNumber && !email && !query) {
        // If the request body is empty, fetch all data
        ContactUsForm.find()
            .exec()
            .then((result) => {
                res.status(200).json({
                    message: 'All contact forms fetched successfully',
                    contactForms: result
                });
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Something went wrong',
                    error: err
                });
            });
    } else {
        // If there is data in the request body, save it to the database
        const contactus = new ContactUsForm({
            name,
            phoneNumber,
            email,
            query
        });

        contactus
            .save()
            .then((result) => {
                console.log(result);
                res.status(200).json({
                    message: 'Form submitted successfully',
                    contactusForm: result
                });
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Something went wrong',
                    error: err
                });
            });
    }
});

module.exports = router;
