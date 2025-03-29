const validateClient = (req, res, next) => {
    const { firstname, lastname} = req.body;
    if (!firstname || !lastname) {
        return res.status(400).json({ error: "Required field: First and Last name" });
    }
    next();
};

const validateProduct = (req, res, next) => {
    const { brand, model} = req.body;
    if (!brand || !model) {
        return res.status(400).json({ error: "Required field: brand and model" });
    }
    next();
};

module.exports = {
    validateClient,
    validateProduct
};
