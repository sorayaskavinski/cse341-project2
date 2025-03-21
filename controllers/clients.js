const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        //#swagger.tags=['clients']
        const db = mongodb.getDatabase();
        const result = await mongodb.getDatabase().db().collection('clients').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSingle = async (req, res) => {
    try {
        //#swagger.tags=['clients']
        const db = mongodb.getDatabase();
        const clientID = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('clients').findOne({ _id: clientID });            
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createClient = async (req, res) => {
    //#swagger.tags=['clients']
    const db = mongodb.getDatabase();
    const { firstname, lastname, phonenumber, address, city, state, zipcode } = req.body;
    
    if (!firstname || !lastname || !phonenumber || !address || !city || !state || !zipcode) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    const client = { firstname, lastname, phonenumber, address, city, state, zipcode };
    try {
        const response = await mongodb.getDatabase().db().collection('clients').insertOne(client);
        if (response.acknowledged) {
            res.status(201).json({ message: "Client created successfully!" });
        } else {
            res.status(500).json({ error: "Failed to create client." });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateClient = async (req, res) => {
    //#swagger.tags=['clients']
    const db = mongodb.getDatabase();
    const { firstname, lastname, phonenumber, address, city, state, zipcode } = req.body;
    
    if (!firstname || !lastname || !phonenumber || !address || !city || !state || !zipcode) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    const client = { firstname, lastname, phonenumber, address, city, state, zipcode };
    try {
        const response = await mongodb.getDatabase().db().collection('clients').replaceOne(client);
        if (response.acknowledged) {
            res.status(201).json({ message: "Client updated  successfully!" });
        } else {
            res.status(500).json({ error: "Failed to update client." });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const deleteClient = async (req, res) => { 
    try {
        //#swagger.tags=['clients'] 
        const db = mongodb.getDatabase(); 
        const productID = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('clients').deleteOne({ _id: clientID });

        if (response.deletedCount === 0) {
            return res.status(404).json({ error: "Client not found" });
        }

        res.status(200).json({ message: "Client deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = {
    getAll,
    getSingle,
    createClient,
    updateClient,
    deleteClient
};