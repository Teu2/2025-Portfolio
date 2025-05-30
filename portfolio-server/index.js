require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const spotifyRoutes = require('./src/routes/spotify');

const app = express();
const port = process.env.PORT || 8888;
const corsOrigins = process.env.CORS_ORIGINS?.split(',').map(o => o.trim());

app.use(cors({ origin: corsOrigins, credentials: true }));
app.use(cookieParser());
app.use('/spotify', spotifyRoutes);

app.listen(port, '127.0.0.1', () => {
    console.log(`\nQUICK USEFUL LINKS:`);
    console.log(`http://127.0.0.1:${port}/spotify`);
    console.log(`http://127.0.0.1:8888/spotify/login`);
    console.log(`http://127.0.0.1:8888/spotify/currently-playing`);
    console.log(`http://127.0.0.1:8888/spotify/recently-played`);
}); 