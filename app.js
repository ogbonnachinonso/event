const express = require('express');
 const mongoose = require('mongoose');
 const bodyParser = require('body-parser');
 const nodemailer = require('nodemailer');

 const path = require('path');
 const dotenv = require('dotenv');

 const passport = require('passport');
const session = require('express-session');

const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash');
 const eventController = require('./controllers/eventController');
 const galleryController = require('./controllers/galleryController');
 const Bio = require('./controllers/bioController');
 const Event = require('./models/event');

 const connectDB = require('./config/db');


// load config
require('dotenv').config();
 require('./config/passport')(passport);

//cloudinary config
const cloudinary = require('cloudinary');
  require('./config/cloudinary');
  //multer config
const upload = require('./config/multer'); 

connectDB();

 const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', '.ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

//Passport middleware 
app.use(passport.initialize());
app.use(passport.session());


//middleware for connect flash
app.use(flash());

//setting up messages globally
app.use((req, res, next) => {
  res.locals.success_msg = req.flash(('success_msg'));
  res.locals.error_msg = req.flash(('error_msg'));
  res.locals.error = req.flash(('error'));
  res.locals.currentUser = req.user;
  next();
})

app.use('/', require('./controllers/eventController'));
app.use('/auth', require('./controllers/authController'));
app.use(galleryController);
app.use(Bio);


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`server running  on port ${port} `))