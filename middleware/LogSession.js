const logSession = (req, res, next) => {
    console.log("Session:", req.session);
    next();
};

module.exports = logSession;
