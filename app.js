const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
var path  = require('path');
var cookieParser = require('cookie-parser');
var createError = require('http-errors');

// env file
require('dotenv').config({path: "./.env"});

// connect Database
require('./models/database').connectDataBase();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// logger
const logger = require('morgan')
app.use(logger("tiny"))

// body parser
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// cookieParse
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Get /
app.use("/", require('./router/indexRouter'));
app.use("/", require('./router/loungeRouter'))
app.use("/", require('./router/shopRouter'))






app.all("*", (req, res, next)=>{
    res.status(404).render('noRouteErr', { message: "Page not found" }); // Render the error page with the message

})


app.listen(process.env.PORT, console.log(`✅ Main server running at http://localhost ${process.env.PORT}`));
