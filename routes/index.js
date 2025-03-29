const router = require('express').Router();  
const passport = require('passport');

router.use('/', require('./swagger'));
router.use('/clients',  require('./clients'));  
router.use('/products', require('./products'));


router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }        
            res.redirect('/');
        });
    });

module.exports = router;
