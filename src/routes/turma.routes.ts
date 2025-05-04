import { Router } from 'express';
import { atualizarTurma, criarTurma, desmatricularAluno, excluirTurma, listarAlunosDaTurma, listarTurmas, matricularAluno, obterTurmaPorId } from '../controllers/turma.controller'; // (Importe outros métodos conforme necessário)
import { validate } from '../middlewares/validate';
import { CriarTurmaSchema } from '../dto/turma.dto';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { TipoUsuario } from '@prisma/client';

const router = Router();

/**
 * @swagger
 * /turmas:
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
 *             type: object
 *             properties:
 *               nome: { type: string }
 *               cursoId: { type: string, format: uuid }
 *     responses:
 *       201:
 *         description: Turma criada
 *       400:
 *         description: Dados inválidos
 */
router.post(
  '/',
  authenticate,
  authorize([TipoUsuario.ADMIN, TipoUsuario.PROFESSOR]),
  validate(CriarTurmaSchema),
  criarTurma
);
router.get('/:id', obterTurmaPorId);
router.put('/:id', atualizarTurma);
router.delete('/:id', excluirTurma);
router.post('/:id/matricular', matricularAluno);
router.post('/:id/desmatricular', desmatricularAluno);
router.get('/:id/alunos', listarAlunosDaTurma);
router.get('/', listarTurmas);

export default router;