import { Usuario } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      usuario?: {
        id: string;
        tipo: string;
      };
    }
  }
}

export {};