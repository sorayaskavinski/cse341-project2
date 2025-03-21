const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        //#swagger.tags=['products']
        const result = await mongodb.getDatabase().db().collection('products').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSingle = async (req, res) => {
    try {
        //#swagger.tags=['products']
        const productID = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('products').find({ _id: productID }).toArray();
            
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createProduct = async (req, res) => {
    //#swagger.tags=['products']  
    const product ={
        brand: req.body.brand,
        model: req.body.model,
        color: req.body.color,
        price: req.body.price,
        item: req.body.item
    };

    const response = await mongodb.getDatabase().db().collection('products').insertOne(product);
        if (response.acknowledged){
            res.status(204).send();
        }
        else{
            res.status(500).json(response.error || 'Some error ocurred while opening the products.');
        }        
};

const updateProduct = async (req, res) => {
    //#swagger.tags=['products']
    const productID = new ObjectId(req.params.id);
    const product = {        
        brand: req.body.brand,
        model: req.body.model,
        color: req.body.color,
        price: req.body.price,
        item: req.body.item
    };
    const response = await mongodb.getDatabase().db().collection('products').replaceOne({ _id: productID }, product);
        if (response.modifiedCount > 0){
            res.status(204).send();
        }
        else{
            res.status(500).json(response.error || 'Some error ocurred while updating the products');
        }
};

const deleteProduct = async (req, res) => { 
    //#swagger.tags=['products']  
    const productID = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productID });

    if (response.deletedCount > 0){
        res.status(204).send();
    }
    else{
        res.status(500).json(response.error || 'Some error ocurred while deleting the product');
    }
};


module.exports = {
    getAll,
    getSingle,
    createProduct,
    updateProduct,
    deleteProduct
};