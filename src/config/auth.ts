// src/config/auth.ts
import jwt from 'jsonwebtoken';
import { env } from './env';
import { Request, Response, NextFunction } from 'express';

type TokenPayload = {
  id: string;
  tipo: 'ALUNO' | 'PROFESSOR' | 'ADMIN';
};

const JWT_CONFIG: jwt.SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256'
};

export function generateToken(usuario: TokenPayload): string {
  return jwt.sign(
    { id: usuario.id, tipo: usuario.tipo },
    env.JWT_SECRET,
    JWT_CONFIG
  );
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
}

export function authMiddleware(allowedRoles?: TokenPayload['tipo'][]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Formato de token inválido' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = verifyToken(token);
      if (allowedRoles && !allowedRoles.includes(decoded.tipo)) {
        return res.status(403).json({ error: 'Acesso não autorizado' });
      }
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
  };
}

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}