const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const musicRoutes = require('./routes/music.routes');

const app = express();

// middleware FIRST
app.use(cors({
    origin: "http://localhost:5173", // frontend URL (change if needed)
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// routes AFTER middleware
app.use('/api/auth', authRoutes);
app.use('/api/music', musicRoutes);

module.exports = app;

