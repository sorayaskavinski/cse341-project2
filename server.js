const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3001;
app.use(bodyParser.json());

// ✅ Debugging Middleware to Log Requests
app.use((req, res, next) => {
    console.log(`🔍 Received request: ${req.method} ${req.url}`);
    next();
});

// ✅ Allow CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, z-key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// ✅ Import Routes
app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log('❌ Database initialization error:', err);
    } else {
        app.listen(port, () => console.log(`✅ Server running on port ${port}`));
    }
});
