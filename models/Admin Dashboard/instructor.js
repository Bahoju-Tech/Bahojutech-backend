import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },

    lastName: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },

    email: {
        type: String,
        required: [true, 'Please input your email'],
        unique: true,
        lowercase: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
        maxlength: [11, "phone number cannot exceed 11 numbers"],
        minlength: [11, "phone number cannot be less than 11 characters"],
        min: 0
    },
    expertise: {
        type: String,
        required: [true, 'select your expertise'],
        enum: [
            "Cloud Computing",
            "UI/UX Design",
            "Web development",
            "Mobile Development"

        ],
        default: null
    },

    status: {
        type: String,
        enum: [
            "Approved",
            "Pending",
            "Rejected",
            "Suspended",
            "Unsuspended"
        ]

    },
   isActive: {
        type: Boolean,
        default: true
   },
    regisAt: {
        type: Date,
        default: null
    },

    experience: {
        type: String,
        required: [true],

    },
    areaOfInterest: {
        type: String,
    },

    linkToPortfolio: {
        type: String,
    },
    bio: {
        type: String,
    }

}, { timestamps: true })

const Instructor = mongoose.model("Instructor", instructorSchema)

export default Instructor