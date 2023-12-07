const express = require('express');
const database = require('./db')
const app = express();
app.use(express.urlencoded({ extended: true }))


require('dotenv').config();
const cors = require('cors');
app.use(cors());
const router = require('./routes/index.routes')
const PORT = process.env.PORT



// use the routes
app.use(express.json())
app.use('/api', router)

app.listen(PORT, () => {
    console.log(` ${'Server up and running'}`);
    database();
});