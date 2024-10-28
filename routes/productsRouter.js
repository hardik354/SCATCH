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
    const imageBuffer = req.file.buffer;

    // Create a new product
    let product = await productModel.create({
      image: {
        data: imageBuffer,
        contentType: req.file.mimetype
    }, // Assuming this is where the image data is coming from
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



router.get("/image/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product || !product.image.data) {
      return res.status(404).send('Image not found');
    }
    
    res.set('Content-Type', product.image.contentType); // Set the content type
    res.send(product.image.data); // Send the image buffer
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
