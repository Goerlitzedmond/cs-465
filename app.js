const express = require('express');
const path = require('path');
const hbs = require('hbs');
const cors = require('cors');
const passport = require('passport');
require('./app_api/models/db');
require('./app_api/models/user');
require('./app_api/config/passport');
require('./app_api/config/jwt');

const app = express();

// Enable CORS for Angular SPA
app.use(cors());

// Set up Handlebars as the view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

// Register Handlebars partials
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON request bodies
app.use(express.json());

// Initialize Passport
app.use(passport.initialize());

// Wire up the API routes
const apiRouter = require('./app_api/routes/index');
app.use('/api', apiRouter);

// Wire up the app server routes
const router = require('./app_server/routes/index');
app.use('/', router);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Travlr Getaways server running at http://localhost:${PORT}`);
});