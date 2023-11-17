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
    res.json('Store');
}

function update (req, res) {
    res.json('Update');
}

module.exports = {
    index,
    show,
    store,
    update
}