const mongodb = require('../data/database');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        //#swagger.tags=['clients']       
        const result = await mongodb.getDatabase().collection('clients').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json('Some error occured while uploading the client');
    }
};

const getSingle = async (req, res) => {
    try {
        //#swagger.tags=['clients']        
        const clientID = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('clients').findOne({ _id: clientID });            
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json('Some error occured while uploading the client');
    }
};

const createClient = async (req, res) => {
    //#swagger.tags=['clients']
    try {        

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
            return res.status(200).json(result);
        } else {
            return res.status(500).json('Some error occurred while creating the client.');
        }
    } catch (error) {
        console.error('Some error occurred while creating the client.', error.message); 
        return res.status(500).json('Some error occurred while creating the client.');
    }
};

const updateClient = async (req, res) => {
    //#swagger.tags=['clients']
    try {
        const clientID = new ObjectId(req.params.id);      

        const client = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phonenumber: req.body.phonenumber,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode
        };

        const response = await mongodb.getDatabase().collection('clients').updateOne(
            { _id: clientID }, 
            { $set: client }
        );
        
        if (response.modifiedCount > 0) {
            const result = await mongodb.getDatabase().collection('clients').findOne({ _id: clientID });
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(500).json('Some error occurred while updating the client.');
        }

    } catch (error) {
        res.status(500).json('Some error occurred while updating the client.');
    }
};



const deleteClient = async (req, res) => { 
    try {
        //#swagger.tags=['clients']  

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(402).json({ error: "Invalid client ID format" });
        }

        const clientID = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().collection('clients').deleteOne({ _id: clientID });

        if (response.deletedCount === 0) {
            return res.status(404).json({ error: "Client not found" });
        }

        res.status(200).json({ message: "Client deleted successfully", clientId: req.params.id });
    } catch (error) {
        res.status(500).json('Some error occurred while deleting the client.');
    }
};


module.exports = {
    getAll,
    getSingle,
    createClient,
    updateClient,
    deleteClient
};