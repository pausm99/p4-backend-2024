import express from "express";
import { AuthController } from "../../controllers/auth/authController";

const router = express.Router();

const authController = new AuthController();

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

export default router;
