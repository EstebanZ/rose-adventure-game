// Express Server for Rose Adventure Game
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve src files
app.use('/src', express.static(path.join(__dirname, '../src')));

// Serve node_modules for Babylon.js
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

// Main route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🌸 Rose Adventure Game server running on http://localhost:${PORT} 🌸`);
    console.log('Press Ctrl+C to stop the server');
});
