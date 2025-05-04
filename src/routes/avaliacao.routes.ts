import { Router } from 'express';
import { 
  criarAvaliacao,
  listarAvaliacoesPorModulo
} from '../controllers/avaliacao.controller';

const router = Router();

router.post('/modulos/:moduloId/avaliacoes', criarAvaliacao);
router.get('/modulos/:moduloId/avaliacoes', listarAvaliacoesPorModulo);

// ... (rotas de atualização/exclusão)