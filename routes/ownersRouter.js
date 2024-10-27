const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");
const flash = require('connect-flash'); // Make sure to require connect-flash

// Creating an owner - Only works in development phase
if (process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {
        try {
            // Check if any owners already exist, return 503 if so
            let owners = await ownerModel.find();
            if (owners.length > 0) {
                return res.status(503).send('Permission not required');
            }
            let { fullname, email, password } = req.body;

            // Create a new owner
            let createdOwner = await ownerModel.create({
                fullname,
                email,
                password,
            });

            // Set a success message
            req.flash('success', 'Owner created successfully!'); // Using connect-flash for success messages

            // Redirect to the admin page
            return res.redirect('/owners/admin'); // Redirect after creation
        } catch (error) {
            // Handle any errors
            console.error(error);
            req.flash('error', 'An error occurred while creating the owner.'); // Set error message
            return res.redirect('/owners/admin'); // Redirect back to the admin page
        }
    });
}

// Route to render the "createproducts" page
router.get('/admin', (req, res) => {
    let success = req.flash('success'); // Get success messages
    res.render("createproducts", { success}); // Pass messages to the view
    // let error = req.flash('error'); // Get error messages
});

module.exports = router;
