const express = require ('express');
const router = express.Router();
const external = require('../controllers/external.controller');

router.get('/', external.getExternals);
router.post('/', external.createExternal);
router.get('/:id', external.getExternal);
router.put('/:id', external.editExternal);
router.delete('/:id', external.deleteExternal);

module.exports = router;