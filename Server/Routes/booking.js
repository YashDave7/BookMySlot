const express = require('express');
const User = require('../models/User');
const Professionals = require('../models/Professionals');
const Appointments = require('../models/Appointments');
const fetchUser = require('../middleware/fetchUser');
const fetchProfessional = require('../middleware/fetchProfessional');
const nodemailer = require('nodemailer');

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;

const client = require('twilio')(accountSid, authToken);

const router = express.Router();


// ROUTE 1: User booking appointment of a professional : POST "api/booking/bookappointment". Login required.
router.post('/bookappointment/:id', fetchUser, async (req, res) => {

    try {
        // console.log(auth-token);
        userid = req.user.id;
        const user = await User.findById(userid).select("-password");
        console.log(userid);
        professionalid = req.params.id;
        const professional = await Professionals.findById(professionalid).select("-password");
        console.log(professionalid);
        // const { timing, appointmentDate } = req.body;

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
            appointmentDate: req.body.appointmentDate,
            timing: req.body.timing,
            bookingStatus: "Upcoming",
            paymentStatus: req.body.paymentStatus,
            paymentAmount: professional.fees,
            // paymentTiming: req
        })


        // CODE TO SEND MAIL NOTIFICATION TO THE USER.
        const useremail = user.email;
        const date = req.body.appointmentDate;
        const slot = req.body.timing;
        console.log("Sending Booking Mail")
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "yashdave307@gmail.com",
                pass: "oqfv kezr tcsl rbte",
            },
        });

        const options = {
            from: 'yashdave307@gmail.com',
            to: useremail, // RECEIVER EMAIL.
            subject: "Appointment Scheduled",
            text: `Your Appointment is scheduled on ${date} at ${slot}`
        };

        transporter.sendMail(options, function (err, info) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("SENT : " + info.response);
        })

        // CODE TO SEND A SMS NOTIFICATION TO THE USER.

        // client.messages
        //     .create({
        //         body: `Appointment Scheduled on BookMySlot with ${professional.name} on ${req.body.appointmentDate} from ${req.body.timing}`,
        //         to: `+91${user.mobile}`, // Text your number
        //         from: process.env.twilioNumber, // From a valid Twilio number
        //     })
        //     .then((message) => console.log(message.sid));

        res.send(booking);
    } catch (error) {
        console.log(error.message);
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
        if (appointment.status == "Cancelled by Professional" || appointment.status == "Cancelled by User") {
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
        cancelled.bookingStatus = "Cancelled by User";


        appointment = await Appointments.findByIdAndUpdate(req.params.id, { $set: cancelled }, { new: true });
        res.json({ "Success": "Appointment has been Cancelled" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured");
    }
})


// ROUTE 3: Cancel the appointment by Professional : POST "api/booking/professionalcancelappointment". Login required.
router.put('/professionalcancelappointment/:id', fetchProfessional, async (req, res) => {

    try {
        console.log("helloooo");
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
        if (appointment.status == "Cancelled by Professional" || appointment.status == "Cancelled by User") {
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
        cancelled.bookingStatus = "Cancelled by Professional";


        appointment = await Appointments.findByIdAndUpdate(req.params.id, { $set: cancelled }, { new: true });
        res.json({ "Success": "Appointment has been Cancelled" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured");
    }
})

module.exports = router;