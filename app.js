const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const path = require("path");
const app = express();
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const indexRouter = require("./routes/index");
const expressSession = require("express-session");
const flash = require("connect-flash");


const db = require("./config/mongoose-connection"); // connect to MongoDB using Mongoose

require("dotenv").config(); // load environment variables from.env file for use

const jwtKey = process.env.JWT_KEY;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: jwtKey,
  })
);
app.use(flash()); // flash messages jo work karte hai vo use karte hai session ka
app.set("view engine", "ejs");

// Import routes created in routes folder
app.use("/",indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000);
