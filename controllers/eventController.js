const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const User = require('../models/user');


//login landing page
//get route
router.get('/', (req, res) => {
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
    res.redirect('/dash')
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
      res.render('events/eventDash', { events: events });
    })
    .catch(err => {
      req.flash('error_msg', 'ERROR: +err');
      res.redirect('/login');
    })
});

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.get('/forgot', (req, res) => {
  res.render('auth/forgot');
});

router.get('/change', (req, res) => {
  res.render('auth/change');
});
module.exports = router;