import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TipoUsuario } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('Variável JWT_SECRET não está definida no .env');
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        tipo: TipoUsuario;
      };
    }
  }
}

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET não definido no .env');
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Formato de token inválido' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      tipo: TipoUsuario;
      iat: number; 
      exp: number;
    };

    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return res.status(401).json({ error: 'Token expirado' });
    }

    req.user = {
      id: decoded.id,
      tipo: decoded.tipo,
    };
    
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Token expirado' });
    }
    res.status(401).json({ error: 'Token inválido' });
  }

  
};

export const authorize = (allowedRoles: TipoUsuario[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(403).json({ error: 'Acesso não autorizado' });
    }

    if (!allowedRoles.includes(req.user.tipo)) {
      return res.status(403).json({ 
        error: 'Permissão insuficiente',
        requiredRoles: allowedRoles,
      });
    }

    next();
  };
};

export const checkOwnership = (resourceOwnerIdField = 'id') => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(403).json({ error: 'Acesso não autorizado' });
    }

    if (req.user.tipo === 'ADMIN') {
      return next();
    }

    if (req.user.id !== req.params[resourceOwnerIdField]) {
      return res.status(403).json({ error: 'Você não é o proprietário deste recurso' });
    }

    next();
  };
};