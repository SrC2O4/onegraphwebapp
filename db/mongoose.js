/* This module will hold our connection to 
   our mongo server through the Mongoose API.
   We will access the connection in our express server. */
const mongoose = require('mongoose')
require('dotenv').config();

/* Connnect to our database */
// Get the URI of the local database, or the one specified on deployment.
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/OneGraphAPI'
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, dbName: 'Arknights_OneGraph'},
    (err, db) => {
        if (err) {
            console.log('Error!')
        } else {
            console.log("YAY we got to the database");
        }
    }
)


module.exports = { mongoose }  // Export the active connection.