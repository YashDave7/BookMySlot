const express = require('express');
const Users = require('../models/User');
const Professionals = require('../models/Professionals');
const Appointments = require('../models/Appointments');
// const Appointments = require('../models/Appointments');
// const fetchUser = require('../middleware/fetchUser');
// const fetchProfessional = require('../middleware/fetchProfessional');
const { toast } = require('react-toastify');

const router = express.Router();

// ROUTE 1: User booking appointment of a professional : POST "api/getAll/bookappointment". Login required.
router.get('/fetchProfessionals', async (req, res) => {
    // FETCHING ALL THE PROFESSIONALS FOR THE USER.
    // WILL CHANGE FETCH RESULTS WHEN USER APPLY FILTER.
    // PARAMETERS WILL COME FROM REQ. IN THE URL.
    // 
    try {
        const professionals = await Professionals.find();
        res.send(professionals);
        // res.send('Hello Moto');
    } catch (error) {
        console.log(error.message);
        toast.error('Internal Server Error');
        res.status(500).send("Some Error Occured");
    }
})

// ROUTE 1: User booking appointment of a professional : POST "api/getAll/bookappointment". Login required.
router.get('/fetchUsers', async (req, res) => {
    // FETCHING ALL THE PROFESSIONALS FOR THE USER.
    // WILL CHANGE FETCH RESULTS WHEN USER APPLY FILTER.
    // PARAMETERS WILL COME FROM REQ. IN THE URL.
    // 
    try {
        const users = await Users.find();
        res.send(users);
        // res.send('Hello Moto');
    } catch (error) {
        console.log(error.message);
        toast.error('Internal Server Error');
        res.status(500).send("Some Error Occured");
    }
})

// ROUTE 1: User booking appointment of a professional : POST "api/getAll/bookappointment". Login required.
router.get('/fetchBookings', async (req, res) => {
    // FETCHING ALL THE PROFESSIONALS FOR THE USER.
    // WILL CHANGE FETCH RESULTS WHEN USER APPLY FILTER.
    // PARAMETERS WILL COME FROM REQ. IN THE URL.
    // 
    try {
        const bookings = await Appointments.find();
        res.send(bookings);
        // res.send('Hello Moto');
    } catch (error) {
        console.log(error.message);
        toast.error('Internal Server Error');
        res.status(500).send("Some Error Occured");
    }
})

module.exports = router;