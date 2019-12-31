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

    // Good practise: Validate id immediately.
    if (!ObjectID.isValid(id)) {
        res.status(404).send(); // if invalid id, definitely can't find resource, 404.
    }

    // Otherwise, findById
    Student.findById(id)
        .then(student => {
            if (!student) {
                res.status(404).send(); // could not find this student
            } else {
                /// sometimes we wrap returned object in another object:
                //res.send({student})
                res.send(student);
            }
        })
        .catch(error => {
            res.status(500).send(); // server error
        });
});

/// a DELETE route to remove a student by their id.
app.delete("/students/:id", (req, res) => {
    const id = req.params.id;

    // Validate id
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    // Delete a student by their id
    Student.findByIdAndRemove(id)
        .then(student => {
            if (!student) {
                res.status(404).send();
            } else {
                res.send(student);
            }
        })
        .catch(error => {
            res.status(500).send(); // server error, could not delete.
        });
});

// a PATCH route for changing properties of a resource.
// (alternatively, a PUT is used more often for replacing entire resources).
app.patch("/students/:id", (req, res) => {
    const id = req.params.id;

    // get the updated name and year only from the request body.
    const { name, year } = req.body;
    const body = { name, year };

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    // Update the student by their id.
    Student.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(student => {
            if (!student) {
                res.status(404).send();
            } else {
                res.send(student);
            }
        })
        .catch(error => {
            res.status(400).send(); // bad request for changing the student.
        });
});

/** User routes below **/
// Set up a POST route to *create* a user of your web app (*not* a student).
app.post("/users", (req, res) => {
    log(req.body);

    // Create a new user
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    // Save the user
    user.save().then(
        user => {
            res.send(user);
        },
        error => {
            res.status(400).send(error); // 400 for bad request
        }
    );
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
