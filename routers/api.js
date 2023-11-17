const express = require('express');
const router = express.Router();
const controller = require('../controllers/api');


router.get('/', controller.index)
router.post('/', controller.store)
router.put('/:event', controller.update)

module.exports = router;