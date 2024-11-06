import { Router } from "express";
import { login } from "../auth/user.auth.controller";
import { validateDTO } from "../middlewares/validation.middleware";
import { UserAuthDTO } from "../auth/user.auth.dto";

const router = Router();

router.post("/login", validateDTO(UserAuthDTO), login);

export default router;
