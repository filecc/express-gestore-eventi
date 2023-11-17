const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events');
const reservationsController = require('../controllers/reservations');
const multer = require('multer');

router.get('/', eventsController.index)
router.get('/:event', eventsController.show)
router.post('/', multer().none(), eventsController.store)
router.put('/:event', multer().none(), eventsController.update)
router.get('/:event/reservations', reservationsController.index)
router.post('/:event/reservations', multer().none(), reservationsController.store)
router.delete('/:event/reservations/:reservation', reservationsController.destroy)

module.exports = router;