const express = require('express');
const router = express.Router();

const clientsController = require('../controllers/clients');

const { isAuthenticated } = require('../middleware/authenticate');
const { validateClient } = require('../middleware/validate');


router.get('/',  clientsController.getAll);
router.get('/:id', clientsController.getSingle);
router.post('/', isAuthenticated, validateClient, clientsController.createClient);
router.put('/:id', isAuthenticated, validateClient, clientsController.updateClient);
router.delete('/:id', isAuthenticated, validateClient, clientsController.deleteClient);

module.exports = router;
