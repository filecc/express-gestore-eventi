const fs = require("fs");
const path = require("path");
const CustomError = require("./customError");

class Reservation {
    id;
    firstName;
    lastName;
    email;
    eventID;

    constructor(id, firstName, lastName, email, eventID){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.eventID = eventID;
    }

    static getAllReservationsForAnEvent(eventID){
        try {
            const reservations = JSON.parse(fs.readFileSync(
                path.resolve(__dirname, "../db/reservations.json"),
                "utf8"
            ));

            const reservationsForEvent = reservations.filter((reservation) => reservation.eventID == eventID);
            if(reservationsForEvent.length == 0){
                throw new CustomError(`No reservations found for event ${eventID}`, 404)
            }
           
            return reservationsForEvent
        } catch (error) {
            throw new CustomError(error.message, error.code)
        }
    }

    static getLastId(){
        try {
            const lastID = JSON.parse(fs.readFileSync(
                path.resolve(__dirname, "../db/reservations.json"),
                "utf8"
            )).sort((a, b) => b.id - a.id)[0].id;
            return lastID
        } catch (error) {
            throw new CustomError(error.message, error.code)
        }
       
    }

    static createReservation(reservation){
        try {
            const reservations = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../db/reservations.json"), "utf8"));
            reservations.push(reservation);
            fs.writeFileSync(
                path.resolve(__dirname, "../db/reservations.json"),
                JSON.stringify(reservations)
            );
            return reservation
        } catch (error) {
            throw new CustomError(error.message, error.code)
        }
    }
}

module.exports = Reservation;