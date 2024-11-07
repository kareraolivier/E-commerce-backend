import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { UnauthorizedError } from "../errors/AppErrors";
import jwt from "jsonwebtoken";

dotenv.config();

type CustomRequest = Request & {
  userId: string;
};
const { JWT_SECRET } = process.env;
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const customReq = req as CustomRequest;
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader)
      throw new UnauthorizedError("Access denied. No token provided.");

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET as string) as any;
    customReq.userId = decoded.loggedInUser.id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default verifyToken;
