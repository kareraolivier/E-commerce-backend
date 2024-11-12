import { validate as isUuid } from "uuid";
import { BadRequestError } from "../errors/AppErrors";
export const isUuidValid = (req: any, next: any) => {
  const { id } = req.params;
  if (!isUuid(id)) {
    throw new BadRequestError("Invalid id");
  }
  next();
};
