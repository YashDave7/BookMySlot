const express = require('express');
const User = require('../models/User');
const Professionals = require('../models/Professionals');
// const Appointments = require('../models/Appointments');
// const fetchUser = require('../middleware/fetchUser');
const fetchProfessional = require('../middleware/fetchProfessional');
const { toast } = require('react-toastify');
const Appointments = require('../models/Appointments');

const router = express.Router();

// ROUTE 1: Fetch all the appointments of a user. : GET "api/professionalRoutes/fetchAppointments". Login required.
router.get('/fetchAppointments', fetchProfessional, async (req, res) => { 
    try {
        const appointments = await Appointments.find({ professionalid: req.professional.id });
        res.send(appointments);
    } catch (error) {
        console.log(error.message);
        toast.error('Internal Server Error');
        res.status(500).send("Some Error Occured");
    }
})

// ROUTE 2: Update slot availability. : UPDATE "api/professionalRoutes/fetchAppointments". Login required.
router.put('/updateSlotAvailability/:profid/:slotid', async (req, res) => { 
    try {
        const professional = await Professionals.findById(req.params.profid);
        const yearlyTiming = professional.yearlyTimings.find(timing => timing.day === req.body.day);
        const timeSlot = yearlyTiming.timeslots.id(req.params.slotid);
        timeSlot.set({ status: 'Not Available' });

        await professional.save(); // Save the changes to the database
        res.json({ professional });
    } catch (error) {
        console.log(error.message);
        toast.error('Internal Server Error');
        res.status(500).send("Some Error Occured");
    }
})



// // ROUTE 1: Fetch all the appointments of a user. : GET "api/professionalRoutes/fetchAppointments". Login required.
// router.get('/fetchPayments', fetchProfessional, async (req, res) => { 
//     try {
//         const payments = await Appointments.find({ professionalid: req.professional.id });
//         res.send(payment);
//     } catch (error) {
//         console.log(error.message);
//         toast.error('Internal Server Error');
//         res.status(500).send("Some Error Occured");
//     }
// })

module.exports = router;