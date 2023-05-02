const express = require('express');
require('dotenv').config()

const { connection } = require('./configs/db')
const { router } = require('./routes/api.router')

const app = express();

app.use(express.json());

app.use('/api', router)

app.get('/', (req, res) => {
    res.send('Base API Endpoint')
})

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log('Connected to DB');
    } catch (error) {
        console.log(error);
        console.log('Cannot connect to DB');
    }
    console.log(`Server runnning on port ${process.env.PORT}`);
})