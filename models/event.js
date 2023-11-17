const fs = require('fs');
const path = require('path');

class Event {
    id;
    title;
    description;
    date;
    maxSeats;

    constructor(id, title, description, date, maxSeats){
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.maxSeats = maxSeats;
    }

    static getEvent(){
        const events = fs.readFileSync(path.resolve(__dirname, '../data/events.json'), 'utf8');
        const event = events.find(event => event.id === id);
        return event
    }

    static addEvent(){
        const events = fs.readFileSync(path.resolve(__dirname, '../data/events.json'), 'utf8');
        const newEvent = new Event(id, title, description, date, maxSeats);
        events.push(newEvent);
        fs.writeFileSync(path.resolve(__dirname, '../data/events.json'), JSON.stringify(events));
        return newEvent
    }

}