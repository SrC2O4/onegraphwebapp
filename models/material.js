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
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  code: {
    type: String,
    required: true
  },
  drop_rate: {
    type: Number,
    required: true
  },
  efficiency: {
    type: Number,
    required: true
  },
  ap_per_item: {
    type: Number,
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
    type: Number,
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

let MaterialSchema = mongoose.model("Material_Event", Material, "Material_Event");
let StagesSchema = mongoose.model("Stages", Stages, "Stages");
let ActivitiesSchema = mongoose.model("Activities", Activities, "Activities")
module.exports = { MaterialSchema, StagesSchema, ActivitiesSchema};

