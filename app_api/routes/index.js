const express = require('express');
const router = express.Router();
const passport = require('passport');
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Trip routes - GET is public
router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripsOne);

// Trip routes - POST and PUT require JWT authentication
router.post('/trips', passport.authenticate('jwt', { session: false }), tripsController.tripsAdd);
router.put('/trips/:tripCode', passport.authenticate('jwt', { session: false }), tripsController.tripsUpdate);

module.exports = router;