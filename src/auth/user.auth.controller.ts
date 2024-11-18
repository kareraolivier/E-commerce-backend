import { NextFunction, Request, Response } from "express";
import { userAuthService } from "./user.auth.service";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await userAuthService.login(email, password);
    res.status(200).json({ userToken: user });
  } catch (error) {
    next(error);
  }
};

export const getLoggedInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await userAuthService.getLoggedInUser(req);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
