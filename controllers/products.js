const mongodb = require('../data/database');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        //#swagger.tags=['products']
        const db = mongodb.getDatabase();
        const result = await mongodb.getDatabase().collection('products').find().toArray();
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
        const result = await mongodb.getDatabase().collection('products').findOne({ _id: productID });

        if (!result) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createProduct = async (req, res) => {
    //#swagger.tags = ['products']
    try{
        if (!req.body.price || !req.body.model || !req.body.brand || !req.body.item) {
            throw new Error('Missing required fields: price, brand, item');
        }
        
        const product = { 
            brand: req.body.brand,
            model: req.body.model, 
            color: req.body.color, 
            price: req.body.price, 
            item: req.body.item 
        };
       const response = await mongodb.getDatabase().collection('products').insertOne(product);
           if (response.acknowledged){
                const result = await mongodb.getDatabase().collection('products').findOne({ _id: response.insertedId });
                res.setHeader('Content-Type', 'application/json');
                return res.status(201).json(result);
           }
           else{
            return res.status(500).json({ error: 'Some error occurred while creating the product.' });
           }
    } catch(error){
        console.error('Internal Server Error:', error.message); 
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
   };

   const updateProduct = async (req, res) => {
    //#swagger.tags=['products']
    try {
        const productID = new ObjectId(req.params.id);

        if (!req.body.brand || !req.body.model || !req.body.price) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const product = { 
            brand: req.body.brand,
            model: req.body.model, 
            color: req.body.color, 
            price: req.body.price, 
            item: req.body.item 
        };

        const response = await mongodb.getDatabase().collection('products').updateOne(
            { _id: productID }, 
            { $set: product }
        );

        if (response.modifiedCount > 0) {
            const result = await mongodb.getDatabase().collection('products').findOne({ _id: productID });
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(400).json({ error: "No product was updated. Check if the ID exists or if the data is incorrect." });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteProduct = async (req, res) => { 
    try {
        //#swagger.tags=['products']  
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid product ID format" });
        }
        
        const productID = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().collection('products').deleteOne({ _id: productID });

        if (response.deletedCount === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createProduct,
    updateProduct,
    deleteProduct
};
