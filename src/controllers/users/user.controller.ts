// src/controllers/users/user.controller.ts

import { Request, Response } from "express";
import { getAllUsers } from "../../services/users/user.service"; // Import the service function

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
