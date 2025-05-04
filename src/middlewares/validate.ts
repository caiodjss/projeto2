import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate = (schema: AnyZodObject) => 
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          errors: err.errors.map(e => ({
            path: e.path.join('.'),
            message: e.message,
          })),
        });
      }
      next(err);
    }
  };