/* 
Milestone 1
Creiamo le seguenti rotte con relativo controller e router senza implementare le funzioni del controller.
[GET] events/ (index)
[POST] events/ (store)
[PUT] events/:event (update)
*/


const express = require('express');
const dotenv = require('dotenv').config();
const router = require('./routers/api');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/events', router);

app.listen(3000, () => {
    console.log('Listening on port 3000');
})