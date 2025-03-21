const router = require('express').Router();

const clientsController = require('../controllers/clients');

router.get('/', clientsController.getAll);

router.get('/:id', clientsController.getSingle);

router.post('/', clientsController.createContact);

router.put('/:id', clientsController.updateContact);

router.delete('/:id', clientsController.deleteContact);

module.exports = router;
