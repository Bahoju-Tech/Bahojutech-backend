import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseTitle: {
        type: String,
        required: [true, 'Please input your preferred course'],
        trim: true,
    },

    subtitleText: {
        type: String,
    },

    duration: {
        type: String,
        required: [true],
    },
    courseFormat: {
        type: String,
        required: [true, "please select your course format"],
         enum: [
            "In person and Online",
            "Online",
            "In person",
        ],
        default: null
    },
     
    whatYouWillLearn: [{
        type: String
    }],

     learningLevel: {
        type: String,
        required: [true, 'select your learning level'],
        enum: [
            "Beginner",
            "Intermidiate",
            "Advanced"
            
        ],
        default: null
    },

    status: {
    type: String,
    enum: ['active', 'draft', 'archived'],
    default: 'draft'
  },
  category: {
    type: String,
    enum: ['design', 'development', 'marketing'],
    default: 'category'
  },

   
   courseDescription: {
        type: String,
    },
    pricing: {
        type: String,
    },
    whatIncludes:{
        type:String
    },

    
   
   

}, { timestamps: true })

const Course = mongoose.model("Course", courseSchema)

export default Course
