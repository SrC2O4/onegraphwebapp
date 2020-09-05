"use strict";
const log = console.log;

const express = require("express");
// starting the express serve
const app = express();

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");

// import the mongoose models
const { MaterialSchema, MaterialSchemaENJPKR, MaterialSchemaTW, StagesSchema, StagesSchemaENJPKR, StagesSchemaTW, ActivitiesSchema, ActivitiesSchemaENJPKR, ActivitiesSchemaTW } = require("./models/material");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// activity api without any parameters, default to be CN server data
app.get("/activity", (req, res) => {
    const currentTime = new Date().getTime();
    var matrix = {'CN':null, 'EN':null, 'TW':null}
    ActivitiesSchema.findOne({'openTime': {$lt: currentTime}, 'closeTime':{$gt: currentTime}})
    .then((events)=> {
        if(events){
            matrix.CN = {eventStatus: {'status':true, 'event':events}}
        } else {
            matrix.CN = {eventStatus: {'status':false, 'event':events}}
        }
    })

    ActivitiesSchemaENJPKR.findOne({'openTime': {$lt: currentTime}, 'closeTime':{$gt: currentTime}})
    .then((events)=> {
        if(events){
            matrix.EN = {eventStatus: {'status':true, 'event':events}}
        } else {
            matrix.EN = {eventStatus: {'status':false, 'event':events}}
        }
    })

    ActivitiesSchemaTW.findOne({'openTime': {$lt: currentTime}, 'closeTime':{$gt: currentTime}})
    .then((events)=> {
        if(events){
            matrix.TW = {eventStatus: {'status':true, 'event':events}}
        } else {
            matrix.TW = {eventStatus: {'status':false, 'event':events}}
        }
    })
    res.send(matrix)
});

// activity api with parameters, sever should be 'CN', 'EN', 'JP','KR', or 'TW'
// if the server parameter is invalid, 404 would be sent
app.get("/activity/:server", (req, res) => {
    const currentTime = new Date().getTime();
    const server = req.params.server
    const serverList = ['CN', 'EN', 'JP','KR', 'TW']

    if (server == 'EN' ||server == 'JP'|| server =='KR' ){
        ActivitiesSchemaENJPKR.findOne({'openTime': {$lt: currentTime}, 'closeTime':{$gt: currentTime}})
        .then((events)=> {
            if(events){
                res.send({eventStatus: {'status':true, 'event':events}})
            } else {
                res.send({eventStatus: {'status':false, 'event':events}})
            }

        })
    } else if(server == 'TW'){
        ActivitiesSchemaTW.findOne({'openTime': {$lt: currentTime}, 'closeTime':{$gt: currentTime}})
        .then((events)=> {
            if(events){
                res.send({eventStatus: {'status':true, 'event':events}})
            } else {
                res.send({eventStatus: {'status':false, 'event':events}})
            }

        })

    } else {
        ActivitiesSchema.findOne({'openTime': {$lt: currentTime}, 'closeTime':{$gt: currentTime}})
        .then((events)=> {
            if(events){
                res.send({eventStatus: {'status':true, 'event':events}})
            } else {
                res.send({eventStatus: {'status':false, 'event':events}})
            }

        })
    }
});


app.get("/stages", (req, res) => {
    StagesSchema.find({},{'_id':0}).then((stages) =>{
        res.send({stages});
    })
});

app.get("/stages/:server", (req, res) => {
    const server = req.params.server
    const serverList = ['CN', 'EN', 'JP','KR', 'TW']

    if (server == 'EN' ||server == 'JP'|| server =='KR' ){
        StagesSchemaENJPKR.find({},{'_id':0}).then((stages) =>{
            res.send({stages});
        })
    }  else if(server == 'TW'){
        StagesSchemaTW.find({},{'_id':0}).then((stages) =>{
            res.send({stages});
        })
    } else{
        StagesSchema.find({},{'_id':0}).then((stages) =>{
            res.send({stages});
        })
    }
});


app.get("/materials", (req, res) => {
    var matrix = {'CN':{}, 'JPENKR':{}, 'TW':{}}
    MaterialSchema.find({},{'_id':0,'Order_id':0,'last_updated':0})
    .then(
        (materials) => {
            matrix.CN = materials; // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
    MaterialSchemaENJPKR.find({},{'_id':0,'Order_id':0,'last_updated':0})
    .then(
        (materials) => {
            matrix.JPENKR = materials; // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
    MaterialSchemaTW.find({},{'_id':0,'Order_id':0,'last_updated':0})
    .then(
        (materials) => {
            matrix.TW = materials; // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
    res.send(matrix)
});

// Get the material list by tier
app.get("/materials/tier/:tier/:server", (req, res) => {
    const tier = req.params.tier;
    const server = req.params.server
    var schema = null;
    if (server == "EN" ||server == "JP" || server == "KR"){
        schema = MaterialSchemaENJPKR
    } else if (server == "TW"){
        schema = MaterialSchemaTW
    } else {
        schema = MaterialSchema
    }
    schema.find({'tier': tier, 'type': 'Material'},{'_id':0,'Order_id':0,'last_updated':0}).sort({'Order_id':1})
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

app.get("/materials/catalyst/:server", (req, res) => {
    const server = req.params.server
    var schema = null;
    if (server == "EN" ||server == "JP" || server == "KR"){
        schema = MaterialSchemaENJPKR
    } else if (server == "TW"){
        schema = MaterialSchemaTW
    } else {
        schema = MaterialSchema
    }
    schema.findOne({'id': '32001'},{'_id':0,'Order_id':0,'last_updated':0})
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

app.get("/materials/gacha/:server", (req, res) => {
    const server = req.params.server
    var schema = null;
    if (server == "EN" ||server == "JP" || server == "KR"){
        schema = MaterialSchemaENJPKR
    } else if (server == "TW"){
        schema = MaterialSchemaTW
    } else {
        schema = MaterialSchema
    }
    schema.findOne({'id': '7003'},{'_id':0,'Order_id':0})
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

app.get("/materials/plan/:server", (req, res) => {
    const server = req.params.server
    var schema = null;
    if (server == "EN" ||server == "JP" || server == "KR"){
        schema = MaterialSchemaENJPKR
    } else if (server == "TW"){
        schema = MaterialSchemaTW
    } else {
        schema = MaterialSchema
    }
    schema.findOne({'id': '7001'},{'_id':0,'Order_id':0,'last_updated':0})
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

app.get("/materials/misc/:server", (req, res) => {
    const server = req.params.server
    var schema = null;
    if (server == "EN" ||server == "JP" || server == "KR"){
        schema = MaterialSchemaENJPKR
    } else if (server == "TW"){
        schema = MaterialSchemaTW
    } else {
        schema = MaterialSchema
    }
    schema.find({'credit_store_value': {$ne: null}, 'type': { $not: { $regex: "Material" } } },{'_id':0,'Order_id':0,'last_updated':0})
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

app.get("/contingency/:server", (req, res) => {
    const server = req.params.server
    var schema = null;
    if (server == "EN" ||server == "JP" || server == "KR"){
        schema = MaterialSchemaENJPKR
    } else if (server == "TW"){
        schema = MaterialSchemaTW
    } else {
        schema = MaterialSchema
    }
    schema.find({'contingency_store_value': {$type:3}},{_id:0})
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
const port = process.env.PORT || 3001 || 3002;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
