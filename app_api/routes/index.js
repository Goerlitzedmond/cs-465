const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripsOne);
router.post('/trips', tripsController.tripsAdd);
router.put('/trips/:tripCode', tripsController.tripsUpdate);

module.exports = router;