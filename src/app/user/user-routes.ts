import { Router } from "express";
import { userController } from "./user-controller";
import auth from "../../middlewares/auth";
import { userRole } from "../../constants/user-role";

const router = Router();

router.get("/admins", userController.getAllAdmins);
router.get("/", userController.getAllUsers);
router.get("/single-user/:userId", userController.getSingleUser);
router.patch("/single-user/:userId", userController.updateSingleUser);
router.delete("/single-user/:userId", userController.removeSingleUser);

export const userRoutes = router;
