import { Usuario } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      usuario?: Usuario;
      };
    }
}

export {};