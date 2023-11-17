const Event = require('../models/event');
const CustomError = require('../models/customError');

function index (req, res) {
    const events = Event.getAllEvents(req.query  ?? '')
    if(!events){
        throw new CustomError('No events found', 404)
    }
    
    res.json(events)
    return
}

function show (req, res) {
    const eventFound = Event.getEvent(req.params.event);
    if(!eventFound){
        throw new CustomError('Event not found', 404)
    }
    res.json(eventFound);
}

function store (req, res) {
    try {
        
        const isDataValid = Event.validateData(req.body);
        if(isDataValid === true){
            const {title, description, date, maxSeats} = req.body;
            const eventAdded = Event.addEvent(title, description, date, maxSeats);
            res.json(eventAdded) 
        } else {           
            throw new CustomError(isDataValid, 400);
        }
       
    } catch (error) {
        throw new CustomError(error.message, error.code);
    }
   
   
}

function update (req, res) {
    const data = Event.editEvent(req.body, req.params.event);
    if(data === false){
        throw new CustomError(data, 404)
    }
    res.json(data);
}

module.exports = {
    index,
    show,
    store,
    update
}
