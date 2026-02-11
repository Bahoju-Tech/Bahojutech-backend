import express from "express";
import Course from "../models/Admin Dashboard/course.js";


// @desc    Create a course
// @route   POST /api/course/create-course
// @access  Public
export const create_course = async (req, res) => {
    const {
        courseTitle,
        subtitleText,
        duration,
        courseFormat,
        whatYouWillLearn,
        learningLevel,
        status,
        category,
        courseDescription,
        pricing,
        whatIncludes
    } = req.body

    // Checks if the course exists
    const courseExist = await Course.find({ courseTitle: courseTitle })
    if (courseExist.length > 0) {
        res.json({ error: "Course already exists with this title" })
    } else {
        const new_course = await Course.create({
            courseTitle,
            subtitleText,
            duration,
            courseFormat,
            whatYouWillLearn,
            learningLevel,
            status,
        category,
            courseDescription,
            pricing,
            whatIncludes
        })
        if (new_course) {
            res.status(201).json({
                status: "OK",
                message: "Course created successfully",
                data: {
                    id_: new_course._id,
                    courseTitle: new_course.courseTitle,
                    subtitleText: new_course.subtitleText,
                    duration: new_course.duration,
                    courseFormat: new_course.courseFormat,
                    whatYouWillLearn: new_course.whatYouWillLearn,
                    learningLevel: new_course.learningLevel,
                    status:new_course.status,
        category:new_course.category,
                    courseDescription: new_course.courseDescription,
                    pricing: new_course.pricing,
                    whatIncludes: new_course.whatIncludes
                },
            })
        } else {
            res.status(400).json({
                message: "Course data not found",
            })
        }
    }
}

// @desc    Get all courses
// @route   GET /api/course/create-course
// @access  Private
export const get_all_course = async (req, res) => {
    const courses = await Course.find({})
    res.json({
        status: "OK",
        message: "All courses retrieved",
        data: courses
    })
}

// @desc    Get one course
// @route   GET /api/course/:id
// @access  Private
export const get_one_course = async (req, res) => {
    const course = await Course.findOne({ _id: req.params.id })
    if (course) {
        res.json({
            status: "OK",
            message: "Course data retrieved",
            data: course
        })
    } else {
        res.json({ message: "Course does not exist" })
    }
}

// @desc    Updates a course information
// @route   PUT /api/course/:id
// @access  Private
export const update_single_course = async (req, res) => {
    const course = await Course.findById(req.params.id)
    const {
        courseTitle,
        subtitleText,
        duration,
        courseFormat,
       whatYouWillLearn,
        learningLevel,
        status,
        category,
        regisAt,
        courseDescription,
        pricing,
        whatIncludes
    } = req.body
    if (course) {
        course.courseTitle = courseTitle || course.courseTitle
        course.subtitleText = subtitleText || course.subtitleText
        course.duration = duration || course.duration
        course.courseFormat = courseFormat || course.courseFormat
        course.whatYouWillLearn = whatYouWillLearn || course.whatYouWillLearn
        course.learningLevel = learningLevel || course.learningLevel
        course.status = status|| course.status
        course.category = category|| course.category
        course.regisAt = regisAt|| course.regisAt
        course.courseDescription = courseDescription || course.courseDescription
        course.pricing = pricing || course.pricing
        course.whatIncludes = whatIncludes || course.whatIncludes

        const updated_course = await course.save()

        if (updated_course) {
            res.status(200).json({
                status: "OK",
                message: "Course details updated successfully",
                data: updated_course
            })
        } else {
            res.status(500).json({ message: "Something went wrong" })
        }
    } else {
        res.status(404).json({ error: "Course does not exist" })
    }
}

// @desc   Delete a course
// @route   DELETE /api/course/:id
// @access  Private
export const delete_single_course = async (req, res) => {
    const course = await Course.findByIdAndDelete(req.params.id)
    if (course) {
        res.json({
            status: "OK",
            message: "Course deleted successfully"
        })
    } else {
        res.json({ message: "Course not found." })
    }
}
