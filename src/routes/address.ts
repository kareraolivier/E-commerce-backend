import { Router } from "express";
import {
  getAllAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
  getAddressByUserId,
} from "../controllers/address/address.controller";
import {
  CreateAddressDTO,
  UpdateAddressDTO,
} from "../controllers/address/address.dto";
import { validateDTO } from "../middlewares/validation.middleware";
import { isUuidValid } from "../middlewares/isUuidValid";
import verifyToken from "../middlewares/authMiddleware";

const router = Router();
router.get("/", getAllAddresses);
router.get("/:id", isUuidValid, getAddressById);
router.get("/user/:id", isUuidValid, getAddressByUserId);
router.post("/", validateDTO(CreateAddressDTO), createAddress);
router.patch("/:id", isUuidValid, validateDTO(UpdateAddressDTO), updateAddress);
router.delete("/:id", verifyToken, isUuidValid, deleteAddress);

export default router;
