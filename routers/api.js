const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events');
const reservationsController = require('../controllers/reservations');
const multer = require('multer');

const auth = require('../middleware/auth');
const doubleMiddleware =  [auth, multer().none()];
/* Events CRUD */
router.get('/', auth, eventsController.index)
router.get('/:event', auth, eventsController.show)
router.post('/', doubleMiddleware, eventsController.store)
router.put('/:event', doubleMiddleware, eventsController.update)

/* RESERVATIONS CRUD */
router.get('/:event/reservations', auth, reservationsController.index)
router.post('/:event/reservations', doubleMiddleware, reservationsController.store)
router.delete('/:event/reservations/:reservation', auth, reservationsController.destroy)

module.exports = router;