import express from "express";
import Instructor from "../models/Admin Dashboard/instructor.js";


// @desc    Register an instructor
// @route   POST /api/instructor/reg-instructor
// @access  Public
export const register_instructor = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        expertise,
        status,
        regisAt,
        experience,
        areaOfInterest,
        linkToPortfolio,
        bio
    } = req.body

    // Checks if the instructor exists
    const instructorExist = await Instructor.find({ $or: [{ email: email }, { phoneNumber: phoneNumber }] })
    if (instructorExist.length > 0) {
        res.json({ error: "Instructor already exists with this email and number" })
    } else {
        const new_instructor = await Instructor.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            expertise,
            status,
        regisAt,
            experience,
            areaOfInterest,
            linkToPortfolio,
            bio
        })
        if (new_instructor) {
            res.status(201).json({
                status: "OK",
                message: "Instructor created successfully",
                data: {
                    id_: new_instructor._id,
                    firstName: new_instructor.firstName,
                    lastName: new_instructor.lastName,
                    email: new_instructor.email,
                    phoneNumber: new_instructor.phoneNumber,
                    expertise: new_instructor.expertise,
                    status: new_instructor.status,
        regisAt: new_instructor.regisAt,
                    experience: new_instructor.experience,
                    areaOfInterest: new_instructor.areaOfInterest,
                    linkToPortfolio: new_instructor.linkToPortfolio,
                    bio: new_instructor.bio
                },
            })
        } else {
            res.status(400).json({
                message: "Instructor data not found",
            })
        }
    }
}

// @desc    Get all instructors
// @route   GET /api/instructor
// @access  Private
export const get_all_instructor = async (req, res) => {
    const instructors = await Instructor.find({})
    res.json({
        status: "OK",
        message: "All instructors retrieved",
        data: instructors
    })
}

// @desc    Get one instructor
// @route   GET /api/instructor/:id
// @access  Private
export const get_one_instructor = async (req, res) => {
    const instructor = await Instructor.findOne({ _id: req.params.id })
    if (instructor) {
        res.json({
            status: "OK",
            message: "Instructor data retrieved",
            data: instructor
        })
    } else {
        res.json({ message: "Instructor does not exist" })
    }
}

// @desc    Updates an instructor information
// @route   PUT /api/instructor/:id
// @access  Private
export const update_single_instructor = async (req, res) => {
    const instructor = await Instructor.findById(req.params.id)
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        expertise,
        status,

        regisAt,
        experience,
        areaOfInterest,
        linkToPortfolio,
        bio
    } = req.body
    if (instructor) {
        instructor.firstName = firstName || instructor.firstName
        instructor.lastName = lastName || instructor.lastName
        instructor.email = email || instructor.email
        instructor.phoneNumber = phoneNumber || instructor.phoneNumber
        instructor.expertise = expertise || instructor.expertise
        instructor.status = status  || instructor.status
        instructor.regisAt = regisAt || instructor.regisAt
        instructor.experience = experience || instructor.experience
        instructor.areaOfInterest = areaOfInterest || instructor.areaOfInterest
        instructor.linkToPortfolio = linkToPortfolio || instructor.linkToPortfolio
        instructor.bio = bio || instructor.bio

        const updated_instructor = await instructor.save()

        if (updated_instructor) {
            res.status(200).json({
                status: "OK",
                message: "Instructor details updated successfully",
                data: updated_instructor
            })
        } else {
            res.status(500).json({ message: "Something went wrong" })
        }
    } else {
        res.status(404).json({ error: "Instructor does not exist" })
    }
}

// @desc   Suspend an instructor
// @route   PUT /api/instructor/suspend/:id
// @access  Private
export const suspend_instrutor = async (req, res) => {
    const instructor = await Instructor.findById(req.params.id)
    if (instructor) {
        instructor.status = "Suspended"
        instructor.isActive = false
        const suspended_instructor = await instructor.save()
        if (suspended_instructor) {
            res.status(200).json({
                status: "OK",
                message: "Instructor suspended successfully",
                data: suspended_instructor
            })
        } else {
            res.status(500).json({ message: "Something went wrong" })
        }
    } else {
        res.status(404).json({ error: "Instructor does not exist" })
    }
}

// @desc   Unsuspend an instructor
// @route   PUT /api/instructor/unsuspend/:id
// @access  Private
export const unsuspend_instrutor = async (req, res) => {
    const instructor = await Instructor.findById(req.params.id)
    if (instructor) {
        instructor.status = "Unsuspended"
        instructor.isActive = true
        const unsuspended_instructor = await instructor.save()
        if (unsuspended_instructor) {
            res.status(200).json({
                status: "OK",
                message: "Instructor unsuspended successfully",
                data: unsuspended_instructor
            })
        } else {
            res.status(500).json({ message: "Something went wrong" })
        }
    } else {
        res.status(404).json({ error: "Instructor does not exist" })
    }
}

// @desc   Delete an instructor
// @route   DELETE /api/instructor/:id
// @access  Private
export const delete_single_instructor = async (req, res) => {
    const instructor = await Instructor.findByIdAndDelete(req.params.id)
    if (instructor) {
        res.json({
            status: "OK",
            message: "Instructor profile deleted successfully"
        })
    } else {
        res.json({ message: "Instructor not found." })
    }
}
