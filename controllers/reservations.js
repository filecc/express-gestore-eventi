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
    const events = Event.getAllEvents();
    const eventID = req.params.event;
    const eventExist = events.find((event) => event.id == eventID);
    
   
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

function destroy (req, res) {
    res.json('Destroy');
}

module.exports = {
    index,
    show,
    store,
    destroy
}
