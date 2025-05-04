import { Router } from 'express';
import { listarUsuarios, criarUsuario } from '../controllers/usuario.controller';
import { validate } from '../middlewares/validate'; // Middleware Zod
import { CriarUsuarioSchema } from '../dto/auth.dto'; // Reutiliza schema de autenticação

const router = Router();

router.get('/', listarUsuarios);
router.post('/', validate(CriarUsuarioSchema), criarUsuario); // Validação com Zod

export default router;