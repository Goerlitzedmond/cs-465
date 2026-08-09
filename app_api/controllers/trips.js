const mongoose = require('mongoose');
const Trip = require('../models/travlr');

// GET: /api/trips - returns all trips
const tripsList = async (req, res) => {
    Trip.find({}).exec()
        .then(trips => {
            if (!trips) return res.status(404).json({ message: 'No trips found' });
            return res.status(200).json(trips);
        })
        .catch(err => res.status(500).json(err));
};

// GET: /api/trips/:tripCode - returns a single trip
const tripsOne = async (req, res) => {
    Trip.find({ code: req.params.tripCode }).exec()
        .then(trip => {
            if (!trip) return res.status(404).json({ message: 'Trip not found' });
            return res.status(200).json(trip);
        })
        .catch(err => res.status(500).json(err));
};

// POST: /api/trips - adds a new trip
const tripsAdd = async (req, res) => {
    Trip.create({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    })
    .then(trip => res.status(201).json(trip))
    .catch(err => res.status(400).json(err));
};

// PUT: /api/trips/:tripCode - updates a trip
const tripsUpdate = async (req, res) => {
    Trip.findOneAndUpdate(
        { code: req.params.tripCode },
        {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        },
        { new: true }
    )
    .then(trip => {
        if (!trip) return res.status(404).json({ message: 'Trip not found' });
        return res.status(200).json(trip);
    })
    .catch(err => res.status(500).json(err));
};

module.exports = { tripsList, tripsOne, tripsAdd, tripsUpdate };