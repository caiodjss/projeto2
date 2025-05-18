import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('[ERROR]', err.stack);

  const response = {
    message: err.message || 'Erro interno no servidor',
    ...(env.NODE_ENV === 'development' && { stack: err.stack })
  };

  res.status(500).json(response);
}