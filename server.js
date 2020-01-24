"use strict";
const log = console.log;

const express = require("express");
// starting the express serve
const app = express();

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");

// import the mongoose models
const { Material } = require("./models/material");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/materials", (req, res) => {
    Material.find().then(
        materials => {
            res.send({ materials }); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});


app.get("/materials/:id", (req, res) => {
    /// req.params has the wildcard parameters in the url, in this case, id.
    // log(req.params.id)
    const id = req.params.id;

    // Otherwise, findById
    Material.findById(id)
        .then(material => {
            if (!material) {
                res.status(404).send(); // could not find this material
            } else {
                /// sometimes we wrap returned object in another object:
                //res.send({material})
                res.send(material);
            }
        })
        .catch(error => {
            res.status(500).send(); // server error
        });
});


app.get("/materials/tier/:tier", (req, res) => {
    /// req.params has the wildcard parameters in the url, in this case, id.
    // log(req.params.id)
    const tier = req.params.tier;
    
    Material.findById(id)
        .then(material => {
            if (!material) {
                res.status(404).send(); // could not find this material
            } else {
                /// sometimes we wrap returned object in another object:
                //res.send({material})
                res.send(material);
            }
        })
        .catch(error => {
            res.status(500).send(); // server error
        });
});


/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + "/client/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 3001;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
