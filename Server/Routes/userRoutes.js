const express = require('express');
const User = require('../models/User');
const Professionals = require('../models/Professionals');
// const Appointments = require('../models/Appointments');
const fetchUser = require('../middleware/fetchUser');
// const fetchProfessional = require('../middleware/fetchProfessional');
const { toast } = require('react-toastify');
const Appointments = require('../models/Appointments');

const router = express.Router();

// ROUTE 1: Fetch all the appointments of a user. : GET "api/userRoutes/fetchAppointments". Login required.
router.get('/fetchAppointments', fetchUser, async (req, res) => { 
    try {
        const appointments = await Appointments.find({ userid: req.user.id });
        res.send(appointments);
    } catch (error) {
        console.log(error.message);
        toast.error('Internal Server Error');
        res.status(500).send("Some Error Occured");
    }
})

module.exports = router;