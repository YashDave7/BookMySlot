// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const ProfessionalSchema = new Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     mobile: {
//         type: String,
//         required: true
//     },
//     profession: {
//         type: String,
//         required: true
//     },
//     specialisation: {
//         type: String,
//         required: true
//     },
//     age: {
//         type: Number,
//         required: true
//     },
//     gender: {
//         type: String,
//         required: true
//     },
//     address: {
//         type: String,
//         required: true
//     },
//     city: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     fees: {
//         type: String,
//         required: true
//     },
//     timings: [
//         {
//             timeFrame: {type: String, required: true}
//         }
//     ],
//     date: {
//         type: Date,
//         default: Date.now
//     },
//     reviews: [
//         {
//             user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
//             rate: { type: Number, required: true },
//             review: { type: String },
//             date: { type: Date, default: Date.now }
//         }
//     ]
// });

// module.exports = mongoose.model('professional', ProfessionalSchema);


const mongoose = require('mongoose');
const { Schema } = mongoose;

const TimingsSchema = new Schema({
    day: {
        type: String,
        required: true
    },
    timeslots: [{
        timeFrame: {
            type: String,
            required: true
        }
    }
    ],
    status: {
        type: String,
        default: 'Vacant'
    }
});

const ProfessionalSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    specialisation: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fees: {
        type: Number,
        required: true
    },
    yearlyTimings: [TimingsSchema],
    date: {
        type: Date,
        default: Date.now
    },
    reviews: [
        {
            user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
            rate: { type: Number, required: true },
            review: { type: String },
            date: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model('professional', ProfessionalSchema);
