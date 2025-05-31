require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 60_000,      // 1 minute
    max: 30,               // Limit each IP to 30 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again after a minute.'
    }
});

const spotifyRoutes = require('./src/routes/spotify');

const app = express();
const port = process.env.PORT || 8888;
const corsOrigins = process.env.CORS_ORIGINS?.split(',').map(o => o.trim());

app.use(helmet());
app.use(cors({ origin: corsOrigins, credentials: true }));
app.use(cookieParser());
app.use('', spotifyRoutes, limiter);

app.listen(port, '127.0.0.1', () => {
    console.log(`\nQUICK USEFUL LINKS:`);
    console.log(`http://127.0.0.1:${port}/`);
    console.log(`http://127.0.0.1:8888/spotify/login`);
    console.log(`http://127.0.0.1:8888/spotify/currently-playing`);
    console.log(`http://127.0.0.1:8888/spotify/recently-played`);
}); 