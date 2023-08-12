const express = require('express');
const Professionals = require('../models/Professionals');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchProfessional = require('../middleware/fetchProfessional');
const { toast } = require('react-toastify');

const router = express.Router();

// ROUTE 1: Create a Professional using: POST "/api/authProfessional/createprofessional". NO login required.
router.post('/createprofessional', [
    // Validations Using express-validator.
    body('name', 'Enter a valid Name').isLength({ min: 2 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('mobile', 'Enter a valid 10 digit Contact No').isLength({ min: 10 }),
    body('profession', 'Enter any one of the given Professions').exists(),
    body('specialisation', 'Enter any one of the given Specialisation').exists(),
    body('age', 'Enter your age').exists(),
    body('gender', 'Enter your gender').exists(),
    body('address', 'Enter your address').exists(),
    body('city', 'Enter your city').exists(),
    body('password', 'Enter a 8 character password').isLength({ min: 8 }),
    body('fees', 'Enter your average fees').exists(),
    body('timing', 'Enter your timing operation').exists(),
], async (req, res) => {
    // If there are errors, return the bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        toast.error('Enter correct Credentials');
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Check whether user with this Email already exists.
        let professional = await Professionals.findOne({ email: req.body.email });
        if (professional) {
            toast.error('Email Already Registered');
            return res.status(400).json({ error: "Professional with this Email already exist" })
        }

        // Hashing Password.
        const salt = await bcrypt.genSalt();
        securePassword = await bcrypt.hash(req.body.password, salt);
        // Adding professional to the Database.
        professional = await Professionals.create({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            profession: req.body.profession,
            specialisation: req.body.specialisation,
            age: req.body.age,
            gender: req.body.gender,
            address: req.body.address,
            city: req.body.city,
            password: securePassword,
            fees: req.body.fees,
            timing: req.body.timing
        })

        const data = {
            professional: {
                id: professional.id
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        console.log(authToken);
        res.json({ authToken });
    } catch (error) {
        console.log(error.message);
        toast.error('Internal Server Error');
        res.status(500).send("Some Error Occured");
    }
})

// ROUTE 2: Authenticate a professional(Login a professional) using : POST "api/authProfessional/loginprofessional". NO login required.
router.post('/loginprofessional', [
    body('email', 'Enter a value Email').isEmail(),
    body('password', 'Enter a value Email').exists()
], async (req, res) => {
    // If there are errors, return the bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let professional = await Professionals.findOne({ email });
        if (!professional) {
            return res.status(400).json({ error: "Email Not Registered" });
        }

        const comparePassword = await bcrypt.compare(password, professional.password);
        if (!comparePassword) {
            return res.status(400).json({ error: "Incorrect Password" });
        }

        const data = {
            professional: {
                id: professional.id
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ authToken });
    } catch (error) {
        console.log(error.message);
        toast.error('Internal Server Error');
        res.status(500).send("Some Error Occured");
    }
})

// ROUTE 3: Get logged in professional's Detail using : POST "api/authProfessional/getprofessional". Login required.
router.post('/getprofessional', fetchProfessional, async (req, res) => {
    try {
        professionalid = req.professional.id;
        const professional = await Professionals.findById(professionalid).select("-password");
        res.send(professional);
    } catch (error) {
        console.log(error.message);
        toast.error('Internal Server Error');
        res.status(500).send("Some Error Occured");
    }
})

module.exports = router;