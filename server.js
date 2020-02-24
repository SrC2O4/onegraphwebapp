"use strict";
const log = console.log;

const express = require("express");
// starting the express serve
const app = express();

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");

// import the mongoose models
const { MaterialSchema, StageSchema } = require("./models/material");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/test/stages", (req, res) => {
    StageSchema.find({}).then((stages) =>{
        res.send({stages});
    }

    )
});
app.get("/materials", (req, res) => {
    MaterialSchema.find({})
    .then(
        (materials) => {
            res.send({ materials }); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

// Get the material list by tier
app.get("/materials/tier/:tier", (req, res) => {
    const tier = req.params.tier;

    MaterialSchema.find({'tier': tier, 'type': 'Material'}).sort({'Order_id':1})
        .then(material => {
            if (!material) {
                res.status(404).send(); // could not find this material
            } else {
                /// sometimes we wrap returned object in another object:
                res.send({material});
            }
        })
        .catch(error => {
            res.status(500).send(); // server error
        });
});

app.get("/materials/catalyst", (req, res) => {

    MaterialSchema.find({'id': '32001'})
        .then(material => {
            if (!material) {
                res.status(404).send(); // could not find this material
            } else {
                /// sometimes we wrap returned object in another object:
                res.send({material});
            }
        })
        .catch(error => {
            res.status(500).send(); // server error
        });
});

app.get("/materials/gacha", (req, res) => {
    MaterialSchema.find({'id': '7003'})
        .then(material => {
            if (!material) {
                res.status(404).send(); // could not find this material
            } else {
                /// sometimes we wrap returned object in another object:
                res.send({material});
            }
        })
        .catch(error => {
            res.status(500).send(); // server error
        });
});

app.get("/materials/plan", (req, res) => {
    MaterialSchema.find({'id': '7001'})
        .then(material => {
            if (!material) {
                res.status(404).send(); // could not find this material
            } else {
                /// sometimes we wrap returned object in another object:
                res.send({material});
            }
        })
        .catch(error => {
            res.status(500).send(); // server error
        });
});

app.get("/materials/misc", (req, res) => {
    MaterialSchema.find({'credit_store_value': {$gt: 0}, 'type': { $not: { $regex: "Material" } } })
        .then(material => {
            if (!material) {
                res.status(404).send(); // could not find this material
            } else {
                /// sometimes we wrap returned object in another object:
                res.send({material});
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
