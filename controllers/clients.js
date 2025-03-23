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

    const response = await mongodb.getDatabase().collection('clients').insertOne(client);
        if (response.acknowledged){
            res.status(204).send();
        }
        else{
            res.status(500).json(response.error || 'Some error ocurred while opening the client.');
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
        const clientID = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().collection('clients').deleteOne({ _id: clientID });

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