const express = require('express');
const router = express.Router();
const Bio = require('../models/bio');
const User = require('../models/user');

const path = require('path');

require('dotenv').config();
const cloudinary = require('cloudinary');
require('../config/cloudinary');
const upload = require('../config/multer');


//login landing page
//get route
router.get('/addbio', (req, res) => {
  res.render('about/add_about');
});

router.get("/about_us", (req, res) => {
  Bio.find({})
    .then(bios => {
      res.render('about/about', { bios: bios });
    })
    .catch(err => {
      req.flash('error_msg', 'ERROR: +err');
      res.redirect('/');
    })
});




// Post routes Add video
router.post('/addbio', async (req, res, next) => {
  try {
    
    const bio = new Bio ()
    bio.bride = req.body.bride,
    bio.groom = req.body.groom,
    bio.met = req.body.met,
    bio.brideparents = req.body.brideparents,
    bio.groomparents = req.body.groomparents,
    bio.pastor = req.body.pastor,
    bio.maid = req.body.maid,
    bio.bestman = req.body.bestman,
    await bio.save()
    req.flash('success_msg', 'Bio Added Successfully')
    res.redirect('/addbio')
  }
  catch (err) {
    req.flash('error_msg', 'ERROR: +err');
    console.error(err);
    res.redirect('/addbio');
  }
});


router.get("/editbio/:id", async (req, res) => {
  try {
    const bio = await Bio.findOne({ _id: req.params.id });
    res.render('about/edit_about', { bio });
  }
  catch (err) {
    req.flash('error_msg', 'ERROR: +err');
    res.redirect('/biodashboard');
  }
});

router.post('/editbio/:id', async (req, res) => {
  try {
    let bio = await Bio.findById(req.params.id)
    if (!bio) {
      return res.render('error/404');
    } else {
      bio = await Bio.findByIdAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      })
      req.flash('success_msg', 'Bio updated successfully');
      res.redirect('/biodashboard');
    }
  } catch (err) {
    req.flash('error_msg', 'ERROR: +err');
    res.redirect('/biodashboard');
    console.error(err)
  }
});


//delete request starts here
router.post("/deletebio/:id", async (req, res) => {
  try {
    // Find bio by id
    let bio = await Bio.findById(req.params.id);

    // Delete bio from db
    await bio.remove();
    req.flash('success_msg', 'Bio post deleted successfully');
    res.redirect('/biodashboard');
  } catch (err) {
    req.flash('error_msg', 'ERROR: +err');
    res.redirect('/biodashboard');
  }
});

router.get("/biodashboard", (req, res) => {
  Bio.find({})
    .then(bios => {
      res.render('about/dashboard', { bios: bios });
    })
    .catch(err => {
      req.flash('error_msg', 'ERROR: +err');
      res.redirect('/login');
    })
});

module.exports = router;