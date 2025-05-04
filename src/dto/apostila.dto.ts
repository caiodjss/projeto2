import { z } from 'zod';

export const CriarApostilaSchema = z.object({
  titulo: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  arquivoUrl: z.string().url("URL do arquivo inválida"),
  moduloId: z.string().uuid("ID do módulo inválido")
});

export type CriarApostilaDto = z.infer<typeof CriarApostilaSchema>;

export const AtualizarApostilaSchema = z.object({
  titulo: z.string().min(3).optional(),
  arquivoUrl: z.string().url().optional()
});

export type AtualizarApostilaDto = z.infer<typeof AtualizarApostilaSchema>;