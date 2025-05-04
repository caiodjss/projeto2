import { z } from 'zod';
import { TipoUsuario } from '@prisma/client';

// Login
export const LoginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});
export type LoginDto = z.infer<typeof LoginSchema>;

// Registrar Usuário
export const CriarUsuarioSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  tipo: z.nativeEnum(TipoUsuario),
  planoId: z.string().optional(),
});
export type CriarUsuarioDto = z.infer<typeof CriarUsuarioSchema>;