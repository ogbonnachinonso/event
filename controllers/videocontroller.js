const express = require('express');
const router = express.Router();
const Video = require('../models/video');
const User = require('../models/user');

const path = require('path');

require('dotenv').config();
const cloudinary = require('cloudinary');
require('../config/cloudinary');
const upload = require('../config/multer');


//login landing page
//get route
router.get('/addVideo', (req, res) => {
  res.render('video/add');
});

router.get("/video", (req, res) => {
  Video.find({})
    .then(galleries => {
      res.render('video/video', { galleries: galleries });
    })
    .catch(err => {
      req.flash('error_msg', 'ERROR: +err');
      res.redirect('/');
    })
});


router.get('/video/:id', (req, res) => {
  Video.findOne({ _id: req.params.id })
    .then((video) => {
      res.render('video/videoDetails', { video: video });
    })
    .catch(err => {
      req.flash('error_msg', 'ERROR: +err');
      res.redirect('/video');
      console.error(err)
    });
});

// Post routes Add video
router.post('/addVideo', upload.single('file'), async (req, res, next) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    const video = new video()
    video.description = req.body.description,
    video.videoUrl = result.secure_url
    await video.save()
    req.flash('success_msg', 'video Added Successfully')
    res.redirect('/addVideo')
  }
  catch (err) {
    req.flash('error_msg', 'ERROR: +err');
    console.error(err);
    res.redirect('/addVideo');
  }
});

module.exports = router;