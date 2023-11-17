const Event = require('../models/event');
const CustomError = require('../models/customError');
const Reservation = require('../models/reservation');

function index (req, res) {
    const reservations = Reservation.getAllReservationsForAnEvent(req.params.event);
    if(reservations){
        res.json(reservations);
        return
    }
    throw new CustomError(`No reservations found for event ${req.params.event}`, 404);
}

function show (req, res) {
   res.send('Show');
}

function store (req, res) {
    res.json('Store');
}

function destroy (req, res) {
    res.json('Destroy');
}

module.exports = {
    index,
    show,
    store,
    destroy
}
