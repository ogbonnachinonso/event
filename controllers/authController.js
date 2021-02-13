const express = require('express');
const passport = require('passport');
const router = express.Router();
const crypto = require('crypto');
const async = require('async');
const nodemailer = require('nodemailer');
const User= require('../models/user');

//@desc Auth with Google
//@route GET /auth/google
router.get('/google', passport.authenticate('google',{ scope: ['profile'] }));

//@desc Google Auth callback
//@route GET /auth/googlecallback
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}), (req, res) =>{
  res.redirect('/dashboard')
});

//@desc logout user
//@route /auth/logout
router.get('/logout', (req, res) =>{
  req.logout()
  res.redirect('/');
});




module.exports = router;