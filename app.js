const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Travlr Getaways server running at http://localhost:${PORT}`);
});