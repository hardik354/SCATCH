const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');


router.get('/', (req, res) => {
    let error = req.flash('error');
    res.render('index', { error, loggedin: false });
});


router.get("/shop" , isLoggedIn, async (req, res) => {
  let products = await productModel.find();
  let success = req.flash('success');
    res.render('shop',{products, success  });
});

// Route for welcoming new registered users
router.get("/welcome", async (req, res) => {
    res.render('welcome',{loggedin: false}); // Render the welcome.ejs page
});

router.get("/addtocart/:productid" , isLoggedIn, async (req, res) => {
   let user = await userModel.findOne({email: req.user.email});
   user.cart.push(req.params.productid);
   await user.save();
   req.flash('success', 'Product added to cart successfully!');
   res.redirect("/shop"); // Redirect to the shop page
});

router.get("/cart", isLoggedIn, async (req, res) => {
    try {
        // Fetch the user and populate the cart
        let user = await userModel.findOne({ email: req.user.email }).populate('cart');

        // Initialize variables to hold cart items and total bill
        const cartItems = user.cart.map(product => {
            const price = Number(product.price);
            const discount = Number(product.discount);
            const platformFee = 20; // Assuming a platform fee of 20 for each product
            
            // Calculate the effective total for this product
            const effectiveTotal = price - discount + platformFee;

            // Return an object containing product details and the total
            return {
                name: product.name,
                price,
                discount,
                platformFee,
                effectiveTotal
            };
        });

        // Calculate the overall total cost of all products
        const overallTotal = cartItems.reduce((sum, item) => sum + item.effectiveTotal, 0);

        // Render the cart view with the user, cart items, and the overall total
        res.render('cart', { user, cartItems, overallTotal });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).send("Internal Server Error");
    }
});


router.get("/logout" , isLoggedIn, (req, res) => {
    res.redirect("/"); // Redirect to the home page after logging out
});
module.exports = router;