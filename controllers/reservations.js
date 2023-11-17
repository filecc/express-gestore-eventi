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
     const eventID = req.params.event;
    const event = Event.getEvent(eventID);
    if(event){
        try {
            const reservationsLastID = Reservation.getLastId();
            const newReservation = new Reservation(
                    reservationsLastID +1,
                    req.body.firstName,
                    req.body.lastName,
                    req.body.email,
                    eventID
            )
            res.json(Reservation.createReservation(newReservation));
            
        } catch (error) {
            throw new CustomError(error.message, error.code);
        }
    }
    
    
}

function destroy (req, res) {
    const reservationID = req.params.reservation;
    const eventID = req.params.event;
    const reservations = Reservation.getAllReservationsForAnEvent(eventID);
    const reservationFound = reservations.filter(reservation => reservation.id == reservationID)
    if(reservationFound.length === 0){
        throw new CustomError('Reservation not found', 404);
    }
    const result = Reservation.deleteReservation(reservationID)
    res.json(result);
}

module.exports = {
    index,
    show,
    store,
    destroy
}
