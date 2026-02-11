import express from "express";
import { delete_single_instructor, get_all_instructor, get_one_instructor, register_instructor, suspend_instrutor, unsuspend_instrutor, update_single_instructor } from "../../controllers/instructorController.js";


const instructor_router = express.Router()


instructor_router.route("/reg-instructor")
.post(register_instructor)
.get(get_all_instructor)


instructor_router.route("/:id")
.get(get_one_instructor)
.put(update_single_instructor)
.delete(delete_single_instructor)


instructor_router.route("/suspend-him/:id")
.put(suspend_instrutor)

instructor_router.route("/unsuspend-him/:id")
.put(unsuspend_instrutor)

export default instructor_router
