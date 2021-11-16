const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true // делаем поле email уникальным
    },
    password: {
        type: String,
        required: true,
    },
    links: [{
        type: Types.ObjectId,
        ref: 'Link' // связываем с моделью Link
    }]
});

module.exports = model('User', schema);