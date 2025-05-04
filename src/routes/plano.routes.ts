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
import { TipoBeneficio, TipoUsuario } from '@prisma/client';

import { PlanoBasicoService } from '../services/plano-basico.service';
import { PlanoEmpreendedorService } from '../services/plano-empreendedor.service';
import { PlanoStartupService } from '../services/plano-startup.service';
import { verificarAcessoPlano } from '../middlewares/plano.middleware';


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

router.get('/whatsapp-links',
  authenticate,
  verificarAcessoPlano(TipoBeneficio.GRUPO_WHATSAPP),
  async (req, res) => {
    const service = new PlanoBasicoService();
    const links = await service.obterLinksWhatsApp(req.usuario!.id);
    res.json(links);
  }
);

router.post('/mentorias',
  authenticate,
  verificarAcessoPlano(TipoBeneficio.MENTORIAS),
  async (req, res) => {
    const service = new PlanoEmpreendedorService();
    const mentoria = await service.agendarMentoria(
      req.usuario!.id, 
      req.body.data, 
      req.body.tema
    );
    res.json(mentoria);
  }
);


router.post('/modelagem-negocios',
  authenticate,
  verificarAcessoPlano(TipoBeneficio.MODELAGEM_NEGOCIOS),
  async (req, res) => {
    const service = new PlanoStartupService();
    const modelagem = await service.iniciarModelagemNegocio(
      req.usuario!.id, 
      req.body
    );
    res.json(modelagem);
  }
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