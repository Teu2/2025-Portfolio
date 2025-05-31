require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 60_000,      
    max: 10,               
    message: {
        error: 'Too many requests, please try again after a minute.'
    }
});

const spotifyRoutes = require('./src/routes/spotify');

const app = express();
const port = process.env.PORT || 8888;
const url = process.env.URL 

if (!process.env.CORS_ORIGINS) {
    throw new Error('CORS_ORIGINS must be set in .env');
}

const corsOrigins = process.env.CORS_ORIGINS.split(',').map((o) => o.trim());
app.use(helmet());
app.use(cors({ origin: corsOrigins, credentials: true }));
app.use(cookieParser());
app.use(limiter);
app.use('', spotifyRoutes);

app.listen(port, url, () => {
    console.log(`\nQUICK USEFUL LINKS:`);
    console.log(`http://${url}:${port}/`);
    console.log(`http://${url}:${port}/spotify/login`);
    console.log(`http://${url}:${port}/spotify/currently-playing`);
    console.log(`http://${url}:${port}/spotify/recently-played`);
});  