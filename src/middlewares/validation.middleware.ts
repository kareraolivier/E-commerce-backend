import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";

export const validateDTO = (dtoClass: any) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const dtoObj = plainToInstance(dtoClass, req.body);

      const errors: ValidationError[] = await validate(dtoObj);

      if (errors.length > 0) {
        return res.status(400).json({
          message: "Validation failed",
          errors: errors.map((error) => error.constraints),
        });
      }

      return next();
    } catch (error: any) {
      console.error("Validation error:", error);
      return res.status(500).json({
        message: "Internal server error during validation",
        error: error.message,
      });
    }
  };
};
