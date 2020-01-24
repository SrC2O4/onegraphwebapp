const mongoose = require('mongoose')

const Stage = new mongoose.Schema({
    code:{
        type: String,
        required: true
    },
    drop_rate:{
        type: Number,
        required: true
    },
    efficiency:{
        type: Number,
        required: true
    },
    ap_per_item:{
        type: Number,
        required: true
    },
    extra_drop: {
        type: [String],
        required: false
    }
});

const Material = new mongoose.Schema( {
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
		required: false,
		// default: 1
    },
    golden_ticket_value: {
		type: Number,
		required: false,
		// default: 1
    },
    tier: {
		type: Number,
		required: true,
		// default: 1
    },
    credit_store_value: {
		type: Number,
		required: false,
		// default: 1
    },
    contingency_store_value: {
		type: Number,
		required: false,
		// default: 1
    },
    lowest_ap_stages:{
        type: [Stage],
        required: false
    },

    balanced_stages: {
        type: [Stage],
        required: false
    },

    drop_rate_first_stages: {
        type: [Stage],
        required: false
    }

} )

let MaterialSchema = mongoose.model('Material', Material, 'Material')
module.exports = {MaterialSchema}