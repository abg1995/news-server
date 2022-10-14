
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const archivedSchema = new Schema({
    title: {
        type: String,
       // required: true
    },
    text: {
        type: String,
       // required: true
    },
    image: {
        type: String
    },
    date: {
        type: String,
        //required: true
    }

}); 


module.exports = model("Archived", archivedSchema);

