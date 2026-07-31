const mongoose = require('mongoose');
const Trip = require('../models/travlr');

// GET: /api/trips - returns all trips
const tripsList = async (req, res) => {
    Trip
        .find({})
        .exec()
        .then(trips => {
            if (!trips) {
                return res.status(404).json({ message: 'No trips found' });
            }
            return res.status(200).json(trips);
        })
        .catch(err => {
            return res.status(500).json(err);
        });
};

// GET: /api/trips/:tripCode - returns a single trip
const tripsOne = async (req, res) => {
    Trip
        .find({ code: req.params.tripCode })
        .exec()
        .then(trip => {
            if (!trip) {
                return res.status(404).json({ message: 'Trip not found' });
            }
            return res.status(200).json(trip);
        })
        .catch(err => {
            return res.status(500).json(err);
        });
};

module.exports = { tripsList, tripsOne };