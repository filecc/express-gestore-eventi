const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events');
const reservationsController = require('../controllers/reservations');


router.get('/', eventsController.index)
router.get('/:event', eventsController.show)
router.post('/', eventsController.store)
router.put('/:event', eventsController.update)
router.get('/:event/reservations', reservationsController.index)
router.post('/:event/reservations', reservationsController.store)
router.delete('/:event/reservations/:reservation', reservationsController.destroy)

module.exports = router;