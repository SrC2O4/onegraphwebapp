const mongoose = require("mongoose");

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
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },

  id: {
    type: String,
    required: true
  },

  green_ticket_value: {
    type: Number,
    required: false
  },

  golden_ticket_value: {
    type: Number,
    required: false
  },

  tier: {
    type: Number,
    required: true
  },

  credit_store_value: {
    type: { event: Number, normal: Number },
    required: false
  },
  contingency_store_value: {
    type: Number,
    required: false
  },

  lowest_ap_stages: {
    type: { event: [Stage], normal: [Stage] },
    required: false
  },

  balanced_stages: {
    type: { event: [Stage], normal: [Stage] },
    required: false
  },

  drop_rate_first_stages: {
    type: { event: [Stage], normal: [Stage] },
    required: false
  },

  Order_id: {
    type: Number,
    required: true
  },

  Notes: {
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

let MaterialSchema = mongoose.model("Material", Material, "Material");
let StageSchema = mongoose.model("Stage", Stage, "Stage");
module.exports = { MaterialSchema, StageSchema };
