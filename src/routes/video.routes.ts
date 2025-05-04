import { Router } from 'express';
import {
  criarVideo,
  listarVideosPorModulo,
  atualizarVideo,
  excluirVideo
} from '../controllers/video.controller';
import { validate } from '../middlewares/validate';
import { CriarVideoSchema, AtualizarVideoSchema } from '../dto/video.dto';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { TipoUsuario } from '@prisma/client';

const router = Router();

router.post(
  '/modulos/:moduloId/videos',
  authenticate,
  authorize([TipoUsuario.PROFESSOR, TipoUsuario.ADMIN]),
  validate(CriarVideoSchema),
  criarVideo
);

router.get('/modulos/:moduloId/videos', listarVideosPorModulo);

router.put(
  '/videos/:id',
  authenticate,
  authorize([TipoUsuario.PROFESSOR, TipoUsuario.ADMIN]),
  validate(AtualizarVideoSchema),
  atualizarVideo
);

router.delete(
  '/videos/:id',
  authenticate,
  authorize([TipoUsuario.PROFESSOR, TipoUsuario.ADMIN]),
  excluirVideo
);

export default router;