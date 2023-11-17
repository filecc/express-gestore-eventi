const fs = require("fs");
const path = require("path");
const CustomError = require("./customError");
const Event = require("./event");

class Reservation {
  id;
  firstName;
  lastName;
  email;
  eventID;

  constructor(id, firstName, lastName, email, eventID) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.eventID = eventID;
  }

  static getAllReservationsForAnEvent(eventID) {
    try {
      const reservations = JSON.parse(
        fs.readFileSync(
          path.resolve(__dirname, "../db/reservations.json"),
          "utf8"
        )
      );

      const reservationsForEvent = reservations.filter(
        (reservation) => reservation.eventID == eventID
      );
      if (reservationsForEvent.length == 0) {
        throw new CustomError(
          `No reservations found for event ${eventID}`,
          404
        );
      }

      return reservationsForEvent;
    } catch (error) {
      throw new CustomError(error.message, error.code);
    }
  }

  static getLastId() {
    try {
      const lastID = JSON.parse(
        fs.readFileSync(
          path.resolve(__dirname, "../db/reservations.json"),
          "utf8"
        )
      ).sort((a, b) => b.id - a.id)[0].id;
      return lastID;
    } catch (error) {
      throw new CustomError(error.message, error.code);
    }
  }

  static isAlreadyReserved(email, eventID, firstName, lastName) {
    try {
      const reservations = JSON.parse(
        fs.readFileSync(
          path.resolve(__dirname, "../db/reservations.json"),
          "utf8"
        )
      );
      const reservationsForEvent = reservations.filter(
        (reservation) => reservation.eventID == eventID
      );
      const reservation = reservationsForEvent.find(
        (reservation) =>
          reservation.email.toLowerCase() == email &&
          reservation.firstName.toLowerCase() == firstName.toLowerCase() &&
          reservation.lastName.toLowerCase() == lastName.toLowerCase()
      );
      if (reservation) {
        return true;
      }
      return false;
    } catch (error) {
      throw new CustomError(error.message, error.code);
    }
  }

  static createReservation(reservation) {
    this.validateData(reservation);
    try {
      const reservations = JSON.parse(
        fs.readFileSync(
          path.resolve(__dirname, "../db/reservations.json"),
          "utf8"
        )
      );
      reservations.push(reservation);
      fs.writeFileSync(
        path.resolve(__dirname, "../db/reservations.json"),
        JSON.stringify(reservations, null, 2)
      );

      return reservation;
    } catch (error) {
      throw new CustomError(error.message, error.code);
    }
  }

  static deleteReservation(reservationID) {
    try {
      let reservations = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../db/reservations.json"), "utf8"));
      const reservationFound = reservations.findIndex(reservation => reservation.id == reservationID);
      reservations.splice(reservationFound, 1);
      fs.writeFileSync(path.resolve(__dirname, "../db/reservations.json"), JSON.stringify(reservations, null, 2));
      
        return `Reservation ${reservationID} deleted`
    } catch (error) {
      throw new CustomError(error.message, error.code);
    }
    
  }

  static validateData(reservation) {
    if (!reservation.firstName || !reservation.lastName || !reservation.email) {
      throw new CustomError("Missing required data", 400);
    }
    if (!reservation.email.includes("@")) {
      throw new CustomError("Invalid email address", 400);
    }
    if (!reservation.eventID || !Event.getEvent(reservation.eventID)) {
      throw new CustomError("Invalid event ID", 400);
    }
    if (
      this.isAlreadyReserved(
        reservation.email,
        reservation.eventID,
        reservation.firstName,
        reservation.lastName
      )
    ) {
      throw new CustomError(
        "You have already reserved a seat for this event",
        400
      );
    }
    if(!Event.isSeatAvailable(reservation.eventID)){
        throw new CustomError("No more seats available for this event", 400);
    }
    if(Event.eventIsPassed(reservation.eventID)){
        throw new CustomError("You can't book an event that is already passed.", 400);
    }

    return true;
  }


}

module.exports = Reservation;