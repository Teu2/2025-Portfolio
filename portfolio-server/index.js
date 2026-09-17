require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 60_000,      
    max: 15,               
    message: {
        error: 'Too many requests, please try again after a minute.'
    }
});

const spotifyRoutes = require('./src/routes/spotify');
const chatbotRoutes = require('./src/routes/chatbot');

const app = express();
app.set('trust proxy', 1); // render
const port = process.env.PORT || 8888;
const url = process.env.URL;

if (!process.env.CORS_ORIGINS) {
    throw new Error('CORS_ORIGINS must be set in .env');
}

const corsOrigins = process.env.CORS_ORIGINS.split(',').map((o) => o.trim());
app.use(helmet());
app.use(cors({ origin: corsOrigins, credentials: true }));
app.use(express.json({ limit: '15kb' }));
app.use(cookieParser());
app.use(limiter);
app.use('', spotifyRoutes);
app.use('', chatbotRoutes);

// binding to 0.0.0.0 means "listen on all interfaces," locally it still hits at localhost or 127.0.0.1
app.listen(port, '0.0.0.0', () => {
    console.log("QUICK LINKS:")
    console.log("https://two025-portfolio-dbkd.onrender.com/");
    console.log("http://127.0.0.1:8888/");
});