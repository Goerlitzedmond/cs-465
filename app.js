const express = require('express');
const path = require('path');
const hbs = require('hbs');
require('./app_api/models/db');

const app = express();

// Set up Handlebars as the view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

// Register Handlebars partials
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

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