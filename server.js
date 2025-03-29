require('dotenv').config();

const express = require('express');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const mongodb = require('./data/database'); 
const cors = require('cors');
const logSession = require ('./middleware/LogSession'); 
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

const port = process.env.PORT || 3001;
const app = express();

// Use logSession middleware to log session on every request
app.use(logSession); 

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Set up session handling
app.use(session({
    secret: "secret", 
    resave: false,
    saveUninitialized: true
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Set CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, z-key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Use CORS to allow specific methods
app.use(cors({methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
app.use(cors({origin: '*'}))

// Use routes defined in index.js
app.use("/", require("./routes/index.js"));

// Set up GitHub OAuth strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

// Serialize user data into session
passport.serializeUser((user, done) => {
    done(null, user);  
});

// Deserialize user data from session
passport.deserializeUser((user, done) => {    
    done(null, user); 
});

// Root route - check session status
app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? 
        `Logged in as ${req.session.user.displayName}` : "Logged out");
});

// GitHub OAuth callback route
app.get('/github/callback', 
    passport.authenticate('github', { failureRedirect: '/api-docs'}), 
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);

// Initialize database and start server
mongodb.initDb((error) => {
    if (error) {
        console.log(error);
    } else {
        app.listen(port, () => {
            console.log(`Database is connected, and server is running on port ${port}`);
        });
    }
});
