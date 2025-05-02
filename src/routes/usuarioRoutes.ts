import { Router } from 'express';
import { listarUsuarios, criarUsuario } from '../controllers/usuario.controller';

const router = Router();

router.get('/', listarUsuarios);
router.post('/', criarUsuario); // Para adicionar usuário manualmente (ex: professor)

export default router;
