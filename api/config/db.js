const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.mongo.url , { useNewUrlParser : true, useUnifiedTopology : true})
    .then((res) => console.log('Successfully connected to the database'))
    .catch(err=>console.log(`> Error while connecting to mongoDB : ${err.message}` ))