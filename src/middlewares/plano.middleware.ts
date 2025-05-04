import { Request, Response, NextFunction } from 'express';
import { PlanoService } from '../services/plano.service';
import { TipoBeneficio } from '@prisma/client';

export function verificarAcessoPlano(beneficio: TipoBeneficio) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const planoService = new PlanoService();
      const temAcesso = await planoService.verificarAcesso(
        req.usuario!.id, 
        beneficio
      );

      if (!temAcesso) {
        return res.status(403).json({ 
          message: 'Acesso não permitido pelo seu plano' 
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}