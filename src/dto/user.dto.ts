import { z } from 'zod';
import { TipoUsuario } from '@prisma/client';

// Atualizar Usuário (ex: perfil)
export const AtualizarUsuarioSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').optional(),
  email: z.string().email('E-mail inválido').optional(),
});
export type AtualizarUsuarioDto = z.infer<typeof AtualizarUsuarioSchema>;

// Alterar Senha
export const AlterarSenhaSchema = z.object({
  senhaAtual: z.string().min(6, 'Senha atual é obrigatória'),
  novaSenha: z.string().min(6, 'Nova senha deve ter no mínimo 6 caracteres'),
});
export type AlterarSenhaDto = z.infer<typeof AlterarSenhaSchema>;