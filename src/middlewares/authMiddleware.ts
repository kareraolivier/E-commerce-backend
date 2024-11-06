import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { UnauthorizedError } from "../errors/AppErrors";

dotenv.config();

type CustomRequest = Request & {
  userId: string;
};

const jwt = require("jsonwebtoken");
function verifyToken(req: CustomRequest, res: Response, next: NextFunction) {
  const token = req.header("Authorization");
  if (!token) throw new UnauthorizedError("Access denied. No token provided.");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.user.id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;
