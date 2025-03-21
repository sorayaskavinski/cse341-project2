const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        //#swagger.tags=['products']
        const db = mongodb.getDatabase();
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
        const db = mongodb.getDatabase();
        const productID = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('products').findOne({ _id: productID });

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
    const db = mongodb.getDatabase();
    const { brand, model, color, price, item } = req.body;
    if (!brand || !model || !color || !price || !item) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    const product = { brand, model, color, price, item };
        try {
        const response = await mongodb.getDatabase().db().collection('products').insertOne(product);
        if (response.acknowledged) {
            res.status(201).json({ message: "Product created successfully!" });
        } else {
            res.status(500).json({ error: "Failed to create product." });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateProduct = async (req, res) => {
    //#swagger.tags=['products']
    const db = mongodb.getDatabase();
    const { brand, model, color, price, item } = req.body;
    if (!brand || !model || !color || !price || !item) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    const prodcut = { brand, model, color, price, item };
    try {
        const response = await mongodb.getDatabase().db().collection('products').replaceOne(prodcut);
        if (response.acknowledged) {
            res.status(201).json({ message: "Product updated  successfully!" });
        } else {
            res.status(500).json({ error: "Failed to update product." });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteProduct = async (req, res) => { 
    try {
        //#swagger.tags=['products']  
        const db = mongodb.getDatabase();
        const productID = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productID });

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
