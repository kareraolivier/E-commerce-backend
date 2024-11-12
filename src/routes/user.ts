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
import { isUuidValid } from "../middlewares/isUuidValid";

const router = Router();

router.get("/", getUsers);
router.get("/:id", isUuidValid, getUserById);
router.post("/", validateDTO(CreateUserDTO), createUser);
router.patch("/:id", isUuidValid, validateDTO(UpdateUserDTO), updateUser);
router.delete("/:id", isUuidValid, deleteUser);

export default router;
