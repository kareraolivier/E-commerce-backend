import { Router } from "express";
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/users/user.controller";
import { CreateUserDTO, UpdateUserDTO } from "../controllers/users/user.dto";
import { validateDTO } from "../middlewares/validation.middleware";
const verifyToken = require("../middlewares/authMiddleware");

const router = Router();

router.get("/", verifyToken, getUsers);
router.get("/:id", getUserById);
router.post("/", validateDTO(CreateUserDTO), createUser);
router.patch("/:id", validateDTO(UpdateUserDTO), updateUser);
router.delete("/:id", deleteUser);

export default router;
