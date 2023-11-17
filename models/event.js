const fs = require('fs');
const path = require('path');
const CustomError = require('./customError');

class Event {
  id;
  title;
  description;
  date;
  maxSeats;

  constructor(id, title, description, date, maxSeats) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.maxSeats = maxSeats;
  }

  static getAllEvents(filters = null) {
    if(filters){
        
        try {
            let events = JSON.parse(fs.readFileSync(
                path.resolve(__dirname, "../db/events.json"),
                "utf8"
              ));
            const availableFilter = ['title', 'date', 'description']
            const filtersKeys = Object.keys(filters);
            filtersKeys.forEach((key) => {
               if(availableFilter.includes(key)){
                   events = events.filter((event) => ((event[key].toLowerCase())).includes(filters[key].toLowerCase()))
               }
            })
            if(events.length == 0){
                throw new CustomError(`No events found with ${filters.date ?? filters.date} ${filters.title ?? filters.title}`, 404)
            }

            return events
           
        } catch (error) {
            throw new CustomError(error.message, error.code);
        }
    } else {
        try {
            const events = JSON.parse(fs.readFileSync(
              path.resolve(__dirname, "../db/events.json"),
              "utf8"
            ));
            return events;
          } catch (error) {
            throw new CustomError(error.message, error.code);
          }
    }

    
  }


  static getEvent(event_id) {
    try {
        const events = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, "../db/events.json"), "utf8")
          );
          const event = events.find((event) => event.id == event_id);
          if(event == undefined){
            return null
          }
          return event;
    } catch (error) {
        throw new CustomError(error.message, error.code);
    }
    
  }

  static addEvent(event_title, event_description, event_date, event_maxSeats) {
    const events = fs.readFileSync(
      path.resolve(__dirname, "../db/events.json"),
      "utf8"
    );
    const lastID = events.sort((a, b) => b.id - a.id)[0].id;

    const newEvent = new Event(
      lastID + 1,
      event_title,
      event_description,
      event_date,
      event_maxSeats
    );
    events.push(newEvent);
    fs.writeFileSync(
      path.resolve(__dirname, "../db/events.json"),
      JSON.stringify(events)
    );
    return newEvent;
  }

  static isSeatAvailable(event_id) {
    try {
        const event = this.getEvent(event_id);
        const reservations = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, "../db/reservations.json"), "utf8")
          );
          const reservationsForEvent = reservations.filter((reservation) => reservation.eventID == event_id);
          if(reservationsForEvent.length >= event.maxSeats){
              return false
          }
          return true
    } catch (error) {
        throw new CustomError(error.message, error.code);
    }
  }

  static eventIsPassed(event_id) {
    try {
      const event = this.getEvent(event_id);
      const eventDate = new Date(event.date);
      const today = new Date();
      if (eventDate < today) {
        return true;
      }
      return false;
    } catch (error) {
      throw new CustomError(error.message, error.code);
    }
  }

}

module.exports = Event;