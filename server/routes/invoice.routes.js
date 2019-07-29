const express = require ('express');
const router = express.Router();
const invoice = require('../controllers/invoice.controller');

router.get('/', invoice.getInvoices);
router.post('/', invoice.createInvoice);
router.get('/:id', invoice.getInvoice);
router.put('/:id', invoice.editInvoice);
router.delete('/:id', invoice.deleteInvoice);

module.exports = router;