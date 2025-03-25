const mongodb = require('../data/database');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        //#swagger.tags=['clients']
       
        const result = await mongodb.getDatabase().collection('clients').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSingle = async (req, res) => {
    try {
        //#swagger.tags=['clients']        
        const clientID = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('clients').findOne({ _id: clientID });            
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createClient = async (req, res) => {
    //#swagger.tags=['clients']
    try {
        // Force an error for testing 500 response
        if (!req.body.firstname || !req.body.lastname) {
            throw new Error('Missing required fields: firstname or lastname');
        }

        const client = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phonenumber: req.body.phonenumber,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode
        };

        const response = await mongodb.getDatabase().collection('clients').insertOne(client);
        
        if (response.acknowledged) {
            const result = await mongodb.getDatabase().collection('clients').findOne({ _id: response.insertedId });

            res.setHeader('Content-Type', 'application/json');
            return res.status(201).json(result);
        } else {
            return res.status(500).json({ error: 'Some error occurred while creating the client.' });
        }
    } catch (error) {
        console.error('Internal Server Error:', error.message); // Logs error in console
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

const updateClient = async (req, res) => {
    //#swagger.tags=['clients']
    try{
        const clientID = new ObjectId(req.params.id);
        const client ={
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phonenumber: req.body.phonenumber,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode
        };
        
        const response = await mongodb.getDatabase().collection('clients').updateOne({ _id: clientID }, { $set: client });
        if (response.acknowledged){
            const result = await mongodb.getDatabase().collection('clients').findOne({ _id: clientID });
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        }
        else{
            res.status(500).json(response.error || 'Some error ocurred while opening the client.');
        } 
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const deleteClient = async (req, res) => { 
    try {
        //#swagger.tags=['clients']  

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid client ID format" });
        }

        const clientID = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().collection('clients').deleteOne({ _id: clientID });

        if (response.deletedCount === 0) {
            return res.status(404).json({ error: "Client not found" });
        }

        res.status(200).json({ message: "Client deleted successfully", clientId: req.params.id });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};


module.exports = {
    getAll,
    getSingle,
    createClient,
    updateClient,
    deleteClient
};