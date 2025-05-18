// middlewares/authorize.ts
import router from '@routes/usuarioRoutes';
import { Request, Response, NextFunction } from 'express';

// 1. Estender a interface Request do Express
declare global {
  namespace Express {
    interface User {
      id: string;
      role: string; // ou enum se preferir
    }

    interface Request {
      user?: User;
    }
  }
}

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // 2. Verificar se o usuário está autenticado
    if (!req.user) {
      return res.status(401).json({ message: 'Não autenticado' });
    }

    // 3. Verificar se tem a role necessária
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Acesso não autorizado' });
    }

    next();
  };
};