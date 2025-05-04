import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodEffects, ZodError } from 'zod';

export const validate = (schema: AnyZodObject | ZodEffects<any>) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Alteração principal: validar diretamente o req.body
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: 'fail',
          errors: error.errors
        });
      }
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  };