const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.use('/clients', require('./clients'));
router.use('/products', require('./products'));

module.exports = router;
