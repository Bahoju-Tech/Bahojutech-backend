import express from "express";
import Institute from "../models/Admin Dashboard/institute.js";


// @desc    Register a student
// @route   POST /api/institute/reg-student
// @access  Public
export const register_student = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        course,
        learningLevel,
        paymentType,
        amountPaid,
        balance,
        hasGraduated,
        category,
        status,
        isActive
    } = req.body

    //Checks if the student exist
    const studentExist = await Institute.find({ $or: [{ email: email }, { phoneNumber: phoneNumber }] })
    if (studentExist.length > 0) {
        res.json({ error: "Student already exist with this email and number" })
        // Creates a new student profile
    } else {
        const institute_student = await Institute.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            course,
            learningLevel,
            paymentType,
            amountPaid,
            balance,
            hasGraduated,
             category,
        status,
        isActive
        })
        if (institute_student) {
            res.status(201).json({
                status: "OK",
                message: "Student created successfully",
                data: {
                    id_: institute_student._id,
                    firstName: institute_student.firstName,
                    lastName: institute_student.lastName,
                    email: institute_student.email,
                    phoneNumber: institute_student.phoneNumber,
                    course: institute_student.course,
                    learningLevel: institute_student.learningLevel,
                    paymentType: institute_student.paymentType,
                    amountPaid: institute_student.amountPaid,
                    balance: institute_student.balance,
                    hasGraduated:institute_student.hasGraduated

                },
            })
        } else {
            res.status(400).json({
                message: "Student data not found",
            })
        }
    }

}
// @desc    Get all students 
// @route   GET /api/institute_routes/reg-student
// @access  Private
export const get_all_student = async (req, res) => {
    const students = await Institute.find({})
    res.json({
        status: "OK",
        message: "All students are retrived",
        data: students
    })
}
// @desc    Get one student
// @route   GET /api/institute/:id
// @access  Private
export const get_one_student = async (req, res) => {
    const student = await Institute.findOne({ _id: req.params.id })
    if (student) {
        res.json({
            status: "OK",
            message: "Student data retrieved",
            data: student
        })
    } else {
        res.json({ message: "Student does not exist" })
    }

}
// @desc    Updates a student information  
// @route   PUT /api/institute/:id
// @access  Private

export const update_single_student = async (req, res) => {
    const student = await Institute.findById(req.params.id)
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        course,
        learningLevel,
        paymentType,
        amountPaid,
        balance,
        hasGraduated,
         category,
        status,
        isActive
    } = req.body
    if (student) {
        student.firstName = firstName || student.firstName
        student.lastName = lastName  || student.lastName
        student.email  = email     || student.email
        student.phoneNumber = phoneNumber    || student.phoneNumber
        student.course = course     || student.course
        student.learningLevel = learningLevel  || student.learningLevel
        student.paymentType = paymentType    || student.paymentType
        student.amountPaid = amountPaid || student.amountPaid
        student.balance = balance || student.balance
        student.hasGraduated = hasGraduated || student.hasGraduated
        student.category = category || student.category
         student.status = status || student.status
         student.isActive = isActive || student.isActive

const updated_student = await student.save()

if(updated_student){
    res.status(200).json({
        status:"OK",
        message:"student details updated successfully",
        data:updated_student
    })
} else {
    res.status(500).json({message:"something went wrong"})
}

    } else{
        res.status(404).json({error:"student does not exist"})
    }

}



// @desc   Suspend a student
// @route   PUT /api/institute/suspend/:id
// @access  Private
export const suspend_student = async (req, res) => {
    const student = await Institute.findById(req.params.id)
    if (student) {
        student.status = "Suspended"
        student.isActive = false
        const suspended_student = await student.save()
        if (suspended_student) {
            res.status(200).json({
                status: "OK",
                message: "Student suspended successfully",
                data: suspended_student
            })
        } else {
            res.status(500).json({ message: "Something went wrong" })
        }
    } else {
        res.status(404).json({ error: "Student does not exist" })
    }
}

// @desc   Unsuspend a student
// @route   PUT /api/institute/unsuspend/:id
// @access  Private
export const unsuspend_student = async (req, res) => {
    const student = await Institute.findById(req.params.id)
    if (student) {
        student.status = "Unsuspended"
        student.isActive = true
        const unsuspended_student = await student.save()
        if (unsuspended_student) {
            res.status(200).json({
                status: "OK",
                message: "Student unsuspended successfully",
                data: unsuspended_student
            })
        } else {
            res.status(500).json({ message: "Something went wrong" })
        }
    } else {
        res.status(404).json({ error: "Student does not exist" })
    }
}

// @desc   checks if a student has graduated
// @route   GET /api/graduate/:id
// @access  Private

export const graduated_student = async(req,res) =>{
    const student = await Institute.findById(req.params.id)
    if (!student){
        return res.status(404).json({
            success: false,
            message: 'Student not found'
        });
    }
    if (student.hasGraduated){
        return res.status(400).json({
            success: false,
            message: 'Student has already graduated'
        });
    }
    student.hasGraduated = true;
    await student.save();
    return res.status(200).json({
        success: true,
        message: 'Student graduated successfully'
    });
}




// @desc   Delete a student
// @route   GET /api/institute/:id
// @access  Private
export const delete_single_student = async(req,res)=>{
    const student = await Institute.findByIdAndDelete(req.params.id)
    if (student){
        res.json({
            status:"OK",
            message:"student profile deleted sucessfully"
        })
    } else{
        res.json({message:"Student not found."})
    }
}
