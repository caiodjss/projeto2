import { Router } from 'express';
import { 
  criarPlano, 
  listarPlanos, 
  obterPlanoPorId, 
  atualizarPlano, 
  excluirPlano 
} from '../controllers/plano.controller';
import { validate } from '../middlewares/validate';
import { CriarPlanoSchema, AtualizarPlanoSchema } from '../dto/plano.dto';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { TipoUsuario } from '@prisma/client';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Planos
 *   description: Gerenciamento de planos de assinatura
 */

router.post(
  '/',
  authenticate,
  authorize([TipoUsuario.ADMIN]),
  validate(CriarPlanoSchema),
  criarPlano
);

router.get('/', listarPlanos);
router.get('/:id', obterPlanoPorId);
router.put(
  '/:id',
  authenticate,
  authorize([TipoUsuario.ADMIN]),
  validate(AtualizarPlanoSchema),
  atualizarPlano
);
router.delete(
  '/:id',
  authenticate,
  authorize([TipoUsuario.ADMIN]),
  excluirPlano
);

export default router;