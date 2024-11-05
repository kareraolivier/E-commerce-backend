import { NextFunction, Request, Response } from "express";
import { userService } from "../../services/users/user.service";
import { User } from "../../../models/user";
import { validateDTO } from "../../middlewares/validation.middleware";
import { CreateUserDTO } from "./user.dto";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const createUser = async (
  req: Request,
  res: Response
  // next: NextFunction
): Promise<void> => {
  try {
    // await validateDTO(CreateUserDTO)(req, res, next);
    const userData: any = req.body;
    const newUser = await userService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};
