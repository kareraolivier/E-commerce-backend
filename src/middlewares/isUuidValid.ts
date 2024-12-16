import { validate as isUuid } from "uuid";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/AppErrors";

export const isUuidValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!isUuid(id)) {
    throw new BadRequestError("Invalid id");
  }
  next();
};
