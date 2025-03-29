const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {        
        return res.status(401).json("Unauthorized access");
    }
    next();
};

module.exports = { 
    isAuthenticated
}
