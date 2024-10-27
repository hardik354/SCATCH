const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");
const flash = require('connect-flash');

// Middleware for using flash messages
router.use(flash());

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    // Create a new product
    let product = await productModel.create({
      image: req.file.buffer, // Assuming this is where the image data is coming from
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });

    // Flash success message
    req.flash('success', 'Product created successfully!');
    // Redirect to the admin page
    res.redirect("/owners/admin");
  } catch (err) {
    // Flash error message
    res.send(err.message);
  }
});

module.exports = router;
