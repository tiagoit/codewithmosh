const mongoose = require('mongoose');
const Joi = require('joi');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    }
}));

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).max(255).required()
    }

    return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.validate = validateGenre;