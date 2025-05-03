import { Router } from 'express';
import { login, criarUsuario } from '../controllers/auth.controller';
import { validateDto } from '../middlewares/validate';
import { LoginDto, CriarUsuarioDto } from '../dto/auth.dto';

const router = Router();

/**
 * @swagger
 * /auth/registrar:
 *   post:
 *     tags: [Autenticação]
 *     summary: Registrar novo usuário
 *     description: Cria uma conta de usuário na plataforma
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioCreate'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: E-mail já cadastrado
 */
router.post('/registrar', validateDto(CriarUsuarioDto), criarUsuario);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Autenticação]
 *     summary: Autenticar usuário
 *     description: Realiza login e retorna token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioLogin'
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Credenciais inválidas
 *       400:
 *         description: Erro de validação
 */
router.post('/login', validateDto(LoginDto), login);

export default router;