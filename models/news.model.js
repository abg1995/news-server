
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const newsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    date: {
        type: Date,
        required: true
    }
});


module.exports = model("News", newsSchema);

