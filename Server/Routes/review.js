const express = require('express');
const User = require('../models/User');
const Professionals = require('../models/Professionals');
const fetchUser = require('../middleware/fetchUser');

const router = express.Router();

// ROUTE 1: User will write review : POST "api/writeReview". Login required.
router.post('/review/:id', fetchUser, async (req, res) => {
    try {
        // userid = req.user.id;
        const userId = req.user.id;
        const professionalId = req.params.id;

        const user = await User.findById(userId).select("-password");

        const professional = await Professionals.findById(professionalId);
        if (!professional) {
            return res.status(404).send('Professional not found');
        }

        const newReview = {
            user_id: userId,
            username: user.name,
            rate: req.body.rate,
            review: req.body.review
        };

        professional.reviews.push(newReview);
        await professional.save();

        res.send(newReview);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured");
    }
})

module.exports = router;