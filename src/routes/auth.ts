import { Router } from "express";
import { login, getLoggedInUser } from "../auth/user.auth.controller";
import { validateDTO } from "../middlewares/validation.middleware";
import { UserAuthDTO } from "../auth/user.auth.dto";
import verifyToken from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", validateDTO(UserAuthDTO), login);
router.get("/me", verifyToken, getLoggedInUser);

export default router;
