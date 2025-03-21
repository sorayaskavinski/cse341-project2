const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        //#swagger.tags=['clients']
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
        const clientID = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('clients').find({ _id: clientID }).toArray();
            
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createClient = async (req, res) => {
    //#swagger.tags=['clients']  
    const client ={
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phonenumber: req.body.phonenumber,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode
    };

    const response = await mongodb.getDatabase().db().collection('clients').insertOne(client);
        if (response.acknowledged){
            res.status(204).send();
        }
        else{
            res.status(500).json(response.error || 'Some error ocurred while opening the client.');
        }        
};

const updateClient = async (req, res) => {
    //#swagger.tags=['clients']
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
    const response = await mongodb.getDatabase().db().collection('clients').replaceOne({ _id: clientID }, client);
        if (response.modifiedCount > 0){
            res.status(204).send();
        }
        else{
            res.status(500).json(response.error || 'Some error ocurred while updating the client');
        }
};

const deleteClient = async (req, res) => { 
    //#swagger.tags=['clients']  
    const clientID = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('clients').deleteOne({ _id: clientID });

    if (response.deletedCount > 0){
        res.status(204).send();
    }
    else{
        res.status(500).json(response.error || 'Some error ocurred while deleting the client');
    }
};


module.exports = {
    getAll,
    getSingle,
    createClient,
    updateClient,
    deleteClient
};