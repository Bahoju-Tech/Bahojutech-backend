import express from "express";
import { create_course, get_all_course, get_one_course, update_single_course, delete_single_course } from "../../controllers/courseController.js";



const course_router = express.Router()


course_router.route("/create-course")
    .post(create_course)
    .get(get_all_course)


course_router.route("/:id")
    .get(get_one_course)
    .put(update_single_course)
    .delete(delete_single_course)

export default course_router
