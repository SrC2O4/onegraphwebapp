const mongoose = require("mongoose");

const Activities = new mongoose.Schema({
  zoneName: {
    type: String,
    required: true
  },

  openTime: {
    type: Number,
    required: false
  },

  closeTime: {
    type: Number,
    required: false
  },
})

const Stages = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  efficiency:{
    type: Number,
    required: true
  }
});


const Stage = new mongoose.Schema({


  code: {
    type: String,
    required: true
  },
  drop_rate: {
    type: Number,
    get: getActual,
    required: true
  },
  efficiency: {
    type: Number,
    get: getActual,
    required: true
  },
  ap_per_item: {
    type: Number,
    get: getActual,  
    required: true
  },
  extra_drop: {
    type: [{ id: String, name: String }],
    required: false
  }
});

const Material = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  id: {
    type: String,
    required: true
  },

  green_ticket_value: {
    type: { 
        event: {type: 
                Number, get: getActual}, normal: {type: 
                  Number, get: getActual} },
    required: false
  },

  golden_ticket_value: {
    type: { event: {type: 
      Number, get: getActual}, normal: {type: 
        Number, get: getActual} },
    required: false
  },

  tier: {
    type: Number,
    required: true
  },

  credit_store_value: {
    // type: Number,
    type: { event: {type: 
      Number, get: getActual}, normal: {type: 
        Number, get: getActual} },
    required: false
  },
  contingency_store_value: {
    type: { finite: {type: 
      Number, get: getActual}, infinite: {type: 
        Number, get: getActual} },
    required: false
  },

  lowest_ap_stages: {
    // type: [Stage],
    type: { event: [Stage], normal: [Stage] },
    required: false
  },

  balanced_stages: {
    // type: [Stage],
    type: { event: [Stage], normal: [Stage] },
    required: false
  },

  drop_rate_first_stages: {
    // type: [Stage],
    type: { event: [Stage], normal: [Stage] },
    required: false
  },

  Order_id: {
    type: Number,
    required: true
  },

  Notes: {
    // type: String,
    type: { event: String, normal: String },
    required: false
  },

  type: {
    type: String,
    required: false
  },

  last_updated: {
    type: String,
    required: false
  }
});
function getActual(value) {
  if (typeof value !== 'undefined') {
     return parseFloat(value.toString());
  }
  return value;
}

let MaterialSchema = mongoose.model("Material_Event", Material,"Material_Event");
let MaterialSchemaENJPKR = mongoose.model("Material_ENJPKR", Material,"Material_ENJPKR");
let MaterialSchemaTW = mongoose.model("Material_TW", Material,"Material_TW");
let StagesSchema = mongoose.model("Stages", Stages, "Stages");
let StagesSchemaENJPKR = mongoose.model("StagesENJPKR", Stages, "StagesENJPKR");
let StagesSchemaTW = mongoose.model("StagesTW", Stages, "StagesTW");
let ActivitiesSchema = mongoose.model("Activities", Activities, "Activities")
let ActivitiesSchemaENJPKR = mongoose.model("Activities_ENJPKR", Activities,"Activities_ENJPKR")
let ActivitiesSchemaTW = mongoose.model("Activities_TW", Activities,"Activities_TW")

module.exports = { MaterialSchema, MaterialSchemaENJPKR, MaterialSchemaTW, StagesSchema, StagesSchemaENJPKR, StagesSchemaTW, ActivitiesSchema, ActivitiesSchemaENJPKR, ActivitiesSchemaTW};

