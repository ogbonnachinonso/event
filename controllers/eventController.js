const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Event = require('../models/event');
const User = require('../models/user');


//login landing page
//get route
router.get('/', (req, res) => {
  res.render('login');
});

router.get('/event', (req, res) => {
  res.render('index');
});

router.get('/book', (req, res) => {
  res.render('events/event');
});


// Post routes Add Event
router.post('/reserve', async (req, res, next) => {
  try {
    const event = new Event()
      event.name = req.body.name,
      event.email = req.body.email,
      event.category = req.body.category,
      event.number = req.body.number
    await event.save()
    req.flash('success_msg', 'Event Added Successfully')
    res.redirect('/book')
  }
  catch (err) {
    req.flash('error_msg', 'ERROR: +err');
    console.error(err);
    res.redirect('/event');
  }
});

// Get routes edit/:id
router.get("/edit/:id", async (req, res) => {
  try {
    // let event = await Event.findById(req.params.id);
    const event = await Event.findOne({ _id: req.params.id });
    res.render('events/edit', { event });
  }
  catch (err) {
    req.flash('error_msg', 'ERROR: +err');
    res.redirect('/dash');
  }
});

router.post('/edit/:id', async (req, res) => {
  try {
    let event = await Event.findById(req.params.id)
    if (!event) {
      return res.render('error/404');
    } else {
      event = await Event.findByIdAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      })
      req.flash('success_msg', 'Event updated successfully');
      res.redirect('/dash');
    }
  } catch (err) {
    req.flash('error_msg', 'ERROR: +err');
    res.redirect('/dash');
    console.error(err)
  }
});

//delete request starts here
router.post("/delete/:id", async (req, res) => {
  try {
    // Find event by id
    let event = await Event.findById(req.params.id);

    // Delete event from db
    await event.remove();
    req.flash('success_msg', 'Event post deleted successfully');
    res.redirect('/dash');
  } catch (err) {
    req.flash('error_msg', 'ERROR: +err');
    res.redirect('/dash');
  }
});

router.get("/dash", (req, res) => {
  Event.find({})
    .then(events => {
      res.render('events/dashboard', { events: events });
    })
    .catch(err => {
      req.flash('error_msg', 'ERROR: +err');
      res.redirect('/login');
    })
});

router.get("/users", (req, res) => {
  User.find({})
    .then(users => {
      res.render('events/users', { users: users });
    })
    .catch(err => {
      req.flash('error_msg', 'ERROR: +err');
      res.redirect('/login');
    })
});

router.get('/subscribe', (req, res) => {
  res.render('events/subscribe');
});

router.get('/contact', (req, res) => {
  res.render('contact');
});

router.post('/send', (req, res) => {
  const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Subject: ${req.body.subject}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;

    let transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "5c45eea5672f36",
        pass: "70b8eb187fa5d5"
      }
    });

  // setup email data with unicode symbols
  let mailOptions = {
    from: req.body.email, // sender address
    to: 'minnahogbu@gmail.com', // list of receivers
    subject: 'Message From GraceAndy Weds event', // Subject line
    text: req.body.message, // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // res.send(  'Your Email Has Been Sent Successfully' );
    req.flash('success_msg', 'Your Email Has Been Sent Successfully');
    res.redirect('/contact')
   
  });
  
});

module.exports = router;