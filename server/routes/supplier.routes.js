const express = require('express');
const router = express.Router();
const supplier = require('../controllers/supplier.controller');

router.get('/', supplier.getSuppliers);
router.post('/', supplier.createSupplier);
router.get('/:id', supplier.getSupplier);
router.put('/:id', supplier.editSupplier);
router.delete('/:id', supplier.deleteSupplier);

module.exports = router;