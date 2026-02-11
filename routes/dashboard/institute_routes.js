import express from "express";
import { delete_single_student, get_all_student, get_one_student, graduated_student, register_student, suspend_student, unsuspend_student, update_single_student } from "../../controllers/instituteController.js";



const institute_router = express.Router()


institute_router.route("/reg-student")
    .post(register_student)
    .get(get_all_student)


institute_router.route("/:id")
    .get(get_one_student)
    .put(update_single_student, )
    .delete(delete_single_student)

institute_router.route("/suspend/:id")
.put(suspend_student)

institute_router.route("/unsuspend/:id")
.put(unsuspend_student)

institute_router.route("/graduate/:id")
.put(graduated_student)

    export default institute_router
