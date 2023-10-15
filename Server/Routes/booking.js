const express = require('express');
const User = require('../models/User');
const Professionals = require('../models/Professionals');
const Appointments = require('../models/Appointments');
const fetchUser = require('../middleware/fetchUser');
const fetchProfessional = require('../middleware/fetchProfessional');
const { toast } = require('react-toastify');

const router = express.Router();


// ROUTE 1: User booking appointment of a professional : POST "api/booking/bookappointment". Login required.
router.post('/bookappointment/:id', fetchUser, async (req, res) => {

    try {
        // console.log(auth-token);
        userid = req.user.id;
        const user = await User.findById(userid).select("-password");
        
        professionalid = req.params.id;
        const professional = await Professionals.findById(professionalid).select("-password");
        
        const { timing } = req.body;

        booking = await Appointments.create({
            userid: user.id,
            username: user.name,
            useremail: user.email,
            usermobile: user.mobile,
            professionalid: professional.id,
            professionalname: professional.name,
            professionalemail: professional.email,
            professionalmobile: professional.mobile,
            professionalprofession: professional.profession,
            professionalspecialisation: professional.specialisation,
            timing: req.body.timing,
            status: "Pending"
        })
        res.send(booking);
    } catch (error) {
        console.log(error.message);
        toast.error('Internal Server Error');
        res.status(500).send("Some Error Occured");
    }
})


// ROUTE 2: Cancel the appointment by User : POST "api/booking/usercancelappointment". Login required.
router.put('/usercancelappointment/:id', fetchUser, async (req, res) => {

    try {
        // Find the appointment to be cancelled  it.
        let appointment = await Appointments.findById(req.params.id);
        if (!appointment) {
            return res.status(404).send("No such Appointment Exist");
        }

        // checking if appointment belongs to the user.
        if (appointment.userid.toString() != req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // checking if appointment is already cancelled.
        if(appointment.status == "Cancelled by Professional" || appointment.status == "Cancelled by User")
        {
            return res.status(401).send("Appointment already cancelled");
        }

        const cancelled = {}
            cancelled.userid = appointment.userid;
            cancelled.username = appointment.username;
            cancelled.useremail = appointment.useremail;
            cancelled.usermobile = appointment.usermobile;
            cancelled.professionalid = appointment.professionalid;
            cancelled.professionalname = appointment.professionalname;
            cancelled.professionalemail = appointment.professionalemail;
            cancelled.professionalemobile = appointment.professionalmobile;
            cancelled.professionalprofession = appointment.professionalprofession;
            cancelled.professionalspecialisation = appointment.professionalspecialisation;
            // cancelled.timing = appointment.timing;
            cancelled.status = "Cancelled by User";
        

        appointment = await Appointments.findByIdAndUpdate(req.params.id, { $set: cancelled }, { new: true });
        res.json({ "Success": "Appointment has been Cancelled" });
    } catch (error) {
        console.log(error.message);
        toast.error('Internal Server Error');
        res.status(500).send("Some Error Occured");
    }
})


// ROUTE 3: Cancel the appointment by Professional : POST "api/booking/professionalcancelappointment". Login required.
router.put('/professionalcancelappointment/:id', fetchProfessional, async (req, res) => {

    try {
        // Find the appointment to be cancelled  it.
        let appointment = await Appointments.findById(req.params.id);
        if (!appointment) {
            return res.status(404).send("No such Appointment Exist");
        }

        // checking if appointment belongs to the user.
        if (appointment.professionalid.toString() != req.professional.id) {
            return res.status(401).send("Not Allowed");
        }
        
        // checking if appointment is already cancelled.
        if(appointment.status == "Cancelled by Professional" || appointment.status == "Cancelled by User")
        {
            return res.status(401).send("Appointment already cancelled");
        }

        const cancelled = {}
            cancelled.userid = appointment.userid;
            cancelled.username = appointment.username;
            cancelled.useremail = appointment.useremail;
            cancelled.usermobile = appointment.usermobile;
            cancelled.professionalid = appointment.professionalid;
            cancelled.professionalname = appointment.professionalname;
            cancelled.professionalemail = appointment.professionalemail;
            cancelled.professionalemobile = appointment.professionalmobile;
            cancelled.professionalprofession = appointment.professionalprofession;
            cancelled.professionalspecialisation = appointment.professionalspecialisation;
            // cancelled.timing = appointment.timing;
            cancelled.status = "Cancelled by Professional";
        

        appointment = await Appointments.findByIdAndUpdate(req.params.id, { $set: cancelled }, { new: true });
        res.json({ "Success": "Appointment has been Cancelled" });
    } catch (error) {
        console.log(error.message);
        toast.error('Internal Server Error');
        res.status(500).send("Some Error Occured");
    }
})

module.exports = router;