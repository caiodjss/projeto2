import { Router } from 'express';
import {
  enviarMensagem,
  listarMensagens,
  marcarComoLida,
  excluirMensagem
} from '../controllers/mensagem.controller';
import { validate } from '../middlewares/validate';
import { 
  CriarMensagemSchema,
  FiltrarMensagensSchema
} from '../dto/mensagem.dto';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { TipoUsuario } from '@prisma/client';

const router = Router();

router.post('/',
  authenticate,
  authorize([TipoUsuario.ALUNO, TipoUsuario.PROFESSOR, TipoUsuario.ADMIN]),
  validate(CriarMensagemSchema),
  enviarMensagem
);

router.get('/',
  authenticate,
  validate(FiltrarMensagensSchema),
  listarMensagens
);

router.patch('/:id/lida',
  authenticate,
  marcarComoLida
);

router.delete('/:id',
  authenticate,
  excluirMensagem
);

export default router;