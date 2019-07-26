const express = require('express');
const router = express.Router();
const internal = require('../controllers/internal.controller');

router.get('/', internal.findAll);
router.post('/', internal.createInternal);
router.get('/:id', internal.getInternal);
router.put('/:id', internal.editInternal);
router.delete('/:id', internal.deleteInternal);

module.exports = router;