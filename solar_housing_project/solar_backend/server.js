const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Root route for testing
app.get('/', (req, res) => {
    res.send('API is running!');
});

// Middleware - Updated CORS configuration
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'https://benevolent-macaron-a7f480.netlify.app'
    ],
    credentials: true
}));
app.use(express.json());

// Routes
const solarRoutes = require('./routes/solar');
app.use('/api/solar', solarRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running!', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server Error:', error);
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: error.message 
    });
});

router.get('/test', (req, res) => {
    res.json({ message: 'CORS test successful!' });
});

// Do NOT call app.listen() on Vercel
module.exports = app;