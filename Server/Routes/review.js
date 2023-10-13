const express = require('express');
const User = require('../models/User');
const Professionals = require('../models/Professionals');

const router = express.Router();

// ROUTE 1: User will write review : POST "api/writeReview". Login required.
router.get('/writeReview/:id', async (req, res) => {
    try {
        // userid = req.user.id;
        professionalid = req.professional.id;
        professional = await Professionals.update(
            { _id: professionalid },
            {
            reviews: [
                {
                    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
                    review: { type: String, required: true },
                    date: { type: Date, default: Date.now }
                }
            ]
        })

    } catch (error) {
        console.log(error.message);
        toast.error('Internal Server Error');
        res.status(500).send("Some Error Occured");
    }
})

module.exports = router;