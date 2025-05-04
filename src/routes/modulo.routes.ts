import { Router } from 'express';
import {
  criarModulo,
  listarModulosPorCurso,
  atualizarModulo,
  excluirModulo,
  reordenarModulos
} from '../controllers/modulo.controller';
import { validate } from '../middlewares/validate';
import { 
  CriarModuloSchema, 
  AtualizarModuloSchema 
} from '../dto/modulo.dto';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { TipoUsuario } from '@prisma/client';
import { z } from 'zod';

const router = Router();

// Schema para reordenação corrigido
const ReordenarModulosSchema = z.object({
  modulos: z.array(
    z.object({
      id: z.string().uuid(),
      ordem: z.number().int().positive()
    })
  )
});

// Rotas de módulos por curso
router.post(
  '/cursos/:cursoId/modulos',
  authenticate,
  authorize([TipoUsuario.PROFESSOR, TipoUsuario.ADMIN]),
  validate(CriarModuloSchema),
  criarModulo
);

router.get(
  '/cursos/:cursoId/modulos',
  listarModulosPorCurso
);

// Rotas de módulos individuais
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

// Rota para reordenação
router.patch(
  '/modulos/reordenar',
  authenticate,
  authorize([TipoUsuario.PROFESSOR, TipoUsuario.ADMIN]),
  validate(ReordenarModulosSchema), // Agora validando um objeto que contém um array
  reordenarModulos
);

export default router;