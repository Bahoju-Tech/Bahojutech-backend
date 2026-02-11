import mongoose from "mongoose";

const instituteSchema = new mongoose.Schema({
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
    course: {
        type: String,
        required: [true, 'select your option'],
        enum: [
            "Cloud Computing",
            "UI/UX Design",
            "Web development",
            "Mobile Development"

        ],
        default: null
    },

    learningLevel: {
        type: String,
        required: [true, 'select your learning level'],
        enum: [
            "Beginner",
            "Intermidiate",
            "Advanced",
            "Professional"
        ],
        default: null
    },
    paymentType: {
        type: String,
        required: [true, 'select your payment type'],
        enum: [
            "Part-payment",
            "Full-payment",
        ],
        default: null
    },
    regisAt: {
    type: Date,
    default: null
  },

    amountPaid: {
        type: String,

    },
    Balance: {
        type: String,

    },
    hasGraduated: {
        type: Boolean,
        default: false
    },

    category:{
        type: String,
        enum: [
            "UI/UX Type shii"
        ]
    },

     status: {
        type: String,
        enum: [
            "Suspended",
            "Unsuspended"
        ]
    },
    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true })

const Institute = mongoose.model("Institute", instituteSchema)

export default Institute