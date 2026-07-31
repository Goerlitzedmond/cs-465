const mongoose = require('mongoose');
const Trip = require('./travlr');
const fs = require('fs');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

mongoose.connect(dbURI, {});

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
    
    // Read trips from JSON file
    const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));
    
    // Delete existing records then insert new ones
    Trip.deleteMany({})
        .then(() => {
            console.log('Existing trips deleted');
            return Trip.insertMany(trips);
        })
        .then(() => {
            console.log(`${trips.length} trips inserted into database`);
            mongoose.connection.close();
        })
        .catch(err => {
            console.log('Error seeding database: ', err);
            mongoose.connection.close();
        });
});