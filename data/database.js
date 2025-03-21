const { MongoClient } = require('mongodb');
require('dotenv').config();

let database;

const initDb = async (callback) => {
    if (database) {
        console.log('✅ Database is already initialized');
        return callback(null, database);
    }
    
    try {
        const client = new MongoClient(process.env.MONGODB_URL);
        await client.connect();
        database = client.db();  // ✅ This should be client.db(), not just client
        console.log('✅ Database connected successfully');
        callback(null, database);
    } catch (err) {
        console.error('❌ Database connection error:', err);
        callback(err);
    }
};

const getDatabase = () => {
    if (!database) {
        throw new Error('❌ Database not initialized');
    }
    return database;
};

module.exports = { initDb, getDatabase };
