const express = require('express');
const router = express.Router();
const order = require('../controllers/order.controller');

router.get('/', order.findAll);
router.post('/', order.createOrder);
router.get('/:id', order.getOrder);
router.put('/:id', order.editOrder);
router.delete('/:id', order.deleteOrder);

module.exports = router;