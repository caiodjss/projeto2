import { Router } from 'express';
import { atualizarTurma, criarTurma, desmatricularAluno, excluirTurma, listarAlunosDaTurma, listarTurmas, matricularAluno, obterTurmaPorId } from '../controllers/turma.controller';
import { validate } from '../middlewares/validate';
import { CriarTurmaSchema } from '../dto/turma.dto';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { TipoUsuario } from '@prisma/client';

const router = Router();

/**
 * @swagger
 * /api/turmas:
 *   post:
 *     tags: [Turmas]
 *     summary: Criar nova turma
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TurmaCreate'
 *     responses:
 *       201:
 *         description: Turma criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Permissão negada
 */
router.post(
  '/',
  authenticate,
  authorize([TipoUsuario.ADMIN, TipoUsuario.PROFESSOR]),
  validate(CriarTurmaSchema),
  criarTurma
);

// ... (outras rotas permanecem iguais)

export default router;