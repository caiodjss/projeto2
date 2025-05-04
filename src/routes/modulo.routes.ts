import { Router } from 'express';
import {
  criarModulo,
  listarModulosPorCurso,
  atualizarModulo,
  excluirModulo,
  reordenarModulos
} from '../controllers/modulo.controller';
import { validate } from '../middlewares/validate';
import { CriarModuloSchema, AtualizarModuloSchema, ReordenarModulosSchema } from '../dto/modulo.dto';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { TipoUsuario } from '@prisma/client';

const router = Router();

router.post(
  '/cursos/:cursoId/modulos',
  authenticate,
  authorize([TipoUsuario.PROFESSOR, TipoUsuario.ADMIN]),
  validate(CriarModuloSchema),
  criarModulo
);

router.get('/cursos/:cursoId/modulos', listarModulosPorCurso);

router.put(
  '/modulos/:id',
  authenticate,
  authorize([TipoUsuario.PROFESSOR, TipoUsuario.ADMIN]),
  validate(AtualizarModuloSchema),
  atualizarModulo
);

router.delete(
  '/modulos/:id',
  authenticate,
  authorize([TipoUsuario.PROFESSOR, TipoUsuario.ADMIN]),
  excluirModulo
);

router.patch(
  '/modulos/reordenar',
  authenticate,
  authorize([TipoUsuario.PROFESSOR, TipoUsuario.ADMIN]),
  validate(ReordenarModulosSchema),
  reordenarModulos
);

export default router;