import { Router } from "express";
import { getUsers, createUser } from "../controllers/users/user.controller";
import { CreateUserDTO } from "../controllers/users/user.dto";
import { validateDTO } from "../middlewares/validation.middleware";

const router = Router();

router.get("/", getUsers);
router.post("/", validateDTO(CreateUserDTO), createUser);

export default router;
