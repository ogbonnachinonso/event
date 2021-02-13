const express = require('express');
const router = express.Router();
const Gallery = require('../models/gallery');
const User = require('../models/user');

const path = require('path');

require('dotenv').config();
const cloudinary = require('cloudinary');
require('../config/cloudinary');
const upload = require('../config/multer');


//login landing page
//get route
router.get('/addGallery', (req, res) => {
  res.render('gallery/add');
});

router.get("/gallery", (req, res) => {
  Gallery.find({})
    .then(galleries => {
      res.render('gallery/gallery', { galleries: galleries });
    })
    .catch(err => {
      req.flash('error_msg', 'ERROR: +err');
      res.redirect('/');
    })
});


router.get('/gallery/:id', (req, res) => {
  Gallery.findOne({ _id: req.params.id })
    .then((gallery) => {
      res.render('gallery/galleryDetails', { gallery: gallery });
    })
    .catch(err => {
      req.flash('error_msg', 'ERROR: +err');
      res.redirect('/gallery');
      console.error(err)
    });
});

// Post routes Add gallery
router.post('/addGallery', upload.single('image'), async (req, res, next) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    const gallery = new Gallery()
    gallery.description = req.body.description,
    gallery.imgUrl = result.secure_url
    await gallery.save()
    req.flash('success_msg', 'Gallery Added Successfully')
    res.redirect('/addGallery')
  }
  catch (err) {
    req.flash('error_msg', 'ERROR: +err');
    console.error(err);
    res.redirect('/addGallery');
  }
});

// Get routes edit/:id
router.get("/edit/:id", upload.single('image'), async (req, res) => {
  try {
    let gallery = await Gallery.findById(req.params.id);
    res.render('gallery/edit', { gallery });
  }
  catch (err) {
    req.flash('error_msg', 'ERROR: +err');
    res.redirect('/gallery');
  }
});

router.post('/edit/:id', upload.single("image"), async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id)
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(gallery.imgUrl);
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    let data = {
      name: req.body.name,
      work: req.body.work,
      story: req.body.story,
      imgUrl: result.secure_url

    };
    await gallery.findByIdAndUpdate({ _id: req.params.id }, data, {
      new: true,
      // runValidators: true,
    })
    req.flash('success_msg', 'Gallery updated successfully');
    res.redirect('/gallery');
  } catch (err) {
    req.flash('error_msg', 'ERROR: +err');
    res.redirect('/gallery');
    console.error(err)
  }
});

//delete request starts here
router.post("/delete/:id",  async (req, res) => {
  try {
    // Find gallery by id
    let gallery = await Gallery.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(gallery.imgUrl);
    // Delete gallery from db
    await gallery.remove();
    req.flash('success_msg', 'Gallery post deleted successfully');
    res.redirect('/gallery');
  } catch (err) {
    req.flash('error_msg', 'ERROR: +err');
    res.redirect('/gallery');
  }
});

router.get("/dashboard",  (req, res) => {
  Gallery.find({})
    .then(galleries => {
      res.render('events/dashboard', { galleries: galleries });
    })
    .catch(err => {
      req.flash('error_msg', 'ERROR: +err');
      res.redirect('/login');
    })
});

module.exports = router;