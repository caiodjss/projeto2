import { Router } from 'express';
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} from '../controllers/course.controller';
import { validateDto } from '../middlewares/validate';
import { CriarCursoDto, AtualizarCursoDto } from '../dto/course.dto';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { TipoUsuario } from '@prisma/client';

const router = Router();

/**
 * @swagger
 * /cursos:
 *   get:
 *     tags: [Cursos]
 *     summary: Listar todos os cursos
 *     description: Retorna uma lista de cursos disponíveis
 *     responses:
 *       200:
 *         description: Lista de cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curso'
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', getCourses);

/**
 * @swagger
 * /cursos/{id}:
 *   get:
 *     tags: [Cursos]
 *     summary: Obter curso por ID
 *     description: Retorna os detalhes de um curso específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "c3558630-3d8d-48e1-a11a-e62a6899ba9d"
 *     responses:
 *       200:
 *         description: Detalhes do curso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CursoDetalhado'
 *       404:
 *         description: Curso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', getCourseById);

/**
 * @swagger
 * /cursos:
 *   post:
 *     tags: [Cursos]
 *     summary: Criar novo curso
 *     description: Cria um novo curso (requer perfil de ADMIN ou PROFESSOR)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CursoCreate'
 *     responses:
 *       201:
 *         description: Curso criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CursoDetalhado'
 *       400:
 *         description: Dados inválidos ou professor não encontrado
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.post(
  '/',
  authenticate,
  authorize([TipoUsuario.ADMIN, TipoUsuario.PROFESSOR]),
  validateDto(CriarCursoDto),
  createCourse
);

/**
 * @swagger
 * /cursos/{id}:
 *   put:
 *     tags: [Cursos]
 *     summary: Atualizar curso
 *     description: Atualiza os dados de um curso existente (requer ser dono ou ADMIN)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CursoUpdate'
 *     responses:
 *       200:
 *         description: Curso atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CursoDetalhado'
 *       400:
 *         description: Dados inválidos
 *       403:
 *         description: Não autorizado
 *       404:
 *         description: Curso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put(
  '/:id',
  authenticate,
  authorize([TipoUsuario.ADMIN, TipoUsuario.PROFESSOR]),
  validateDto(AtualizarCursoDto),
  updateCourse
);

/**
 * @swagger
 * /cursos/{id}:
 *   delete:
 *     tags: [Cursos]
 *     summary: Remover curso
 *     description: Remove um curso existente (requer perfil de ADMIN)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Curso removido com sucesso
 *       403:
 *         description: Não autorizado
 *       404:
 *         description: Curso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete(
  '/:id',
  authenticate,
  authorize([TipoUsuario.ADMIN]),
  deleteCourse
);

export default router;