import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validateDto<T extends object>(dtoClass: new () => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(dtoClass, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const errorMessages = errors.flatMap(error => 
        Object.values(error.constraints || {})
      );
      return res.status(400).json({ errors: errorMessages });
    }

    req.body = dto;
    next();
  };
}