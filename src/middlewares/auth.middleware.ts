import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../types/user';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: UserRole;  // Corrigido para 'role' (consistente com o JWT)
      };
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { 
      id: string; 
      role: UserRole;
    };
    
    req.user = decoded;
    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Token inválido';
    return res.status(401).json({ error: errorMessage });
  }
};

export const authorize = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.role) {
      return res.status(403).json({ error: 'Usuário não autenticado' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: `Acesso restrito a: ${allowedRoles.join(', ')}`,
        seuPerfil: req.user.role
      });
    }

    next();
  };
};