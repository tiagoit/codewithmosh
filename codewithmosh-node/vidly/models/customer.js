const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: {
        type: Boolean,
    },
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    phone: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    }
}));

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    }

    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;