import { Router } from 'express';
import { login, criarUsuario } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { LoginSchema, CriarUsuarioSchema } from '../dto/auth.dto';

const router = Router();

/**
 * @swagger
 * /auth/registrar:
 *   post:
 *     tags: [Autenticação]
 *     summary: Registrar novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioCreate'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/registrar', validate(CriarUsuarioSchema), criarUsuario);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Autenticação]
 *     summary: Autenticar usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string, format: email }
 *               senha: { type: string }
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', validate(LoginSchema), login);

export default router;