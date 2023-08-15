const mongoose = require('mongoose');
const { Schema } = mongoose;

const AppointmentSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    useremail: {
        type: String,
        required: true,
        unique: true
    },
    usermobile: {
        type: String,
        required: true
    },
    professionalid: {
        type: String,
        required: true
    },
    professionalname: {
        type: String,
        required: true
    },
    professionalemail: {
        type: String,
        required: true
    },
    professionalmobile: {
        type: String,
        required: true
    },
    professionalprofession: {
        type: String,
        required: true
    },
    professionalspecialisation: {
        type: String,
        required: true
    },
    timing: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('appointment',AppointmentSchema);