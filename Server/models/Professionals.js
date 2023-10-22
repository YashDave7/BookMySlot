const mongoose = require('mongoose');
const { Schema } = mongoose;

const TimingsSchema = new Schema({
    day: {
        type: String,
        // required: true
    },
    // yearIndex: {
    //     type: Number,
    //     default: 0
    // },
    timeslots: [{
        timeFrame: {
            type: String,
            required: true
        },
        status: {
            type: String,
            default: 'Vacant'
        }
    }]
});

console.log(increaseDateByOneDay(new Date().toISOString().split('T')[0], 15));

function increaseDateByOneDay(startDate, iterations) {
    const result = [];
    let currentDate = new Date(startDate);

    for (let i = 0; i < iterations; i++) {
        currentDate.setDate(currentDate.getDate() + 1);
        const year = currentDate.getFullYear();
        let month = (currentDate.getMonth() + 1).toString();
        let day = currentDate.getDate().toString();
        if (month.length === 1) {
            month = '0' + month; // pad with 0 if single digit
        }
        if (day.length === 1) {
            day = '0' + day; // pad with 0 if single digit
        }
        result.push( `${year}-${month}-${day}` );
    }

    return result;
}

const generateTimeSlots = () => {
    const slots = [];
    for (let i = 9; i < 17; i++) {
        slots.push(`${i.toString().padStart(2, '0')}:00 - ${i.toString().padStart(2, '0')}:30`);
        slots.push(`${i.toString().padStart(2, '0')}:30 - ${(i + 1).toString().padStart(2, '0')}:00`);
    }
    return slots;
};
console.log(generateTimeSlots());

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
    yearlyTimings: {
        type: [TimingsSchema]
    },
    date: {
        type: Date,
        default: Date.now
    },
    reviews: [
        {
            user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
            username: { type: String, required: true },
            rate: { type: Number, required: true },
            review: { type: String },
            date: { type: Date, default: Date.now }
        }
    ]
});

// Set default slots for each day
TimingsSchema.pre('save', function (next) {
    if (this.isNew) {
        this.timeslots = generateTimeSlots().map(timeSlot => ({ timeFrame: timeSlot }));
    }
    next();
});

ProfessionalSchema.pre('save', async function (next) {
    if (this.isNew) {
        const dates = increaseDateByOneDay(new Date().toISOString().split('T')[0], 60);
        this.yearIndex = 0; // Set the yearIndex here
        this.yearlyTimings = dates.map(date => ({
            day: date,
            timeslots: generateTimeSlots().map(timeSlot => ({ timeFrame: timeSlot }))
        })); // Set the 'yearlyTimings' directly with day and timeslots
    }
    next();
});

module.exports = mongoose.model('professional', ProfessionalSchema);
