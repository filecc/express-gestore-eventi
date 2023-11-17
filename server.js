const express = require('express');
const dotenv = require('dotenv').config();
const router = require('./routers/api');
const errorHandler = require('./middleware/error');
const path = require('path');
const CustomError = require('./models/customError');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './index.html'));
})
app.use('/api/events', router);

app.use(errorHandler)
app.use((req, res) => {
   res.json({ message: 'Not available', code: 404 })
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})