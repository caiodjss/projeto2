import { Router } from 'express';
import { AlunoController } from '../controllers/aluno.controller';
import { validate } from '../middlewares/validate';
import { FiltrarTurmasSchema } from '../dto/aluno.dto';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { TipoUsuario } from '@prisma/client';

const router = Router();
const controller = new AlunoController();

router.get('/turmas',
  authenticate,
  authorize([TipoUsuario.ALUNO]),
  validate(FiltrarTurmasSchema),
  controller.getTurmasMatriculadas
);

router.get('/progresso/videos',
  authenticate,
  authorize([TipoUsuario.ALUNO]),
  controller.getProgressoVideos
);

router.get('/progresso/curso/:cursoId',
  authenticate,
  authorize([TipoUsuario.ALUNO]),
  controller.getProgressoCurso
);

router.get('/mensagens',
  authenticate,
  authorize([TipoUsuario.ALUNO]),
  controller.getMensagens
);

router.post('/contato',
  authenticate,
  authorize([TipoUsuario.ALUNO]),
  controller.enviarMensagem
);

export default router;