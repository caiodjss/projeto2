import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TipoUsuario } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        tipo: TipoUsuario;  // Alinhado com seu schema Prisma
      };
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido' });
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Formato de token inválido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { 
      id: string;
      tipo: TipoUsuario;
    };
    
    req.user = {
      id: decoded.id,
      tipo: decoded.tipo
    };
    
    next();
  } catch (error) {
    const errorMessage = error instanceof jwt.TokenExpiredError 
      ? 'Token expirado' 
      : error instanceof jwt.JsonWebTokenError
        ? 'Token inválido'
        : 'Falha na autenticação';
    
    return res.status(401).json({ 
      error: errorMessage,
      details: error instanceof Error ? error.message : undefined
    });
  }
};

export const authorize = (allowedRoles: TipoUsuario[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(403).json({ error: 'Acesso não autorizado - usuário não autenticado' });
    }

    if (!allowedRoles.includes(req.user.tipo)) {
      return res.status(403).json({ 
        error: 'Acesso não autorizado',
        requiredRoles: allowedRoles,
        currentRole: req.user.tipo,
        message: `Esta ação requer um dos seguintes perfis: ${allowedRoles.join(', ')}`
      });
    }

    next();
  };
};

// Middleware adicional para verificar se o usuário é dono do recurso
export const checkOwnership = (resourceOwnerIdField = 'id') => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(403).json({ error: 'Acesso não autorizado' });
    }

    // Se for ADMIN, permite independente da propriedade
    if (req.user.tipo === 'ADMIN') {
      return next();
    }

    // Compara o ID do usuário com o ID do recurso
    if (req.user.id !== req.params[resourceOwnerIdField]) {
      return res.status(403).json({ 
        error: 'Acesso não autorizado - você não é o proprietário deste recurso'
      });
    }

    next();
  };
};