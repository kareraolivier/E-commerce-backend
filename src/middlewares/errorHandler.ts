import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppErrors";

type ErrorMessage = AppError | Error | any;

export const errorHandler: any = (
  error: ErrorMessage,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.customError) {
    console.error("Custom error:", error);
    return res.status(error.statusCode).json({ message: error.message });
  }
  console.error("Unexpected error:", error);
  res.status(500).json({ message: "Internal Server Error" });
};
