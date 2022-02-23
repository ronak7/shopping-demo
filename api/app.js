const express = require('express')
const cors = require('cors');
const path = require('path')

// const config = require('./config/config');
const db = require('./config/db');
const apiRoutes = require('./routes/index')

/**
  * App Variables
  */
const app = express();
const port = 3000;

/**
 * App Configurations
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(express.static(path.join(__dirname, "uploads")));


app.all('/', (req, res) => res.send('Shopping Cart'));

app.use('/api', apiRoutes);

// app.all('*', (req, res) => res.status(404).send({ status: false, msg: 'No API found' }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))