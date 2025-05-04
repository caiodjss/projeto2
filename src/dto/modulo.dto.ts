import { z } from 'zod';

export const CriarModuloSchema = z.object({
  titulo: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  ordem: z.number().int("Ordem deve ser um número inteiro").positive("Ordem deve ser positiva"),
  cursoId: z.string().uuid("ID do curso inválido")
});

export type CriarModuloDto = z.infer<typeof CriarModuloSchema>;

export const AtualizarModuloSchema = z.object({
  titulo: z.string().min(3).optional(),
  ordem: z.number().int().positive().optional()
});

export type AtualizarModuloDto = z.infer<typeof AtualizarModuloSchema>;

export const ReordenarModulosSchema = z.array(
  z.object({
    id: z.string().uuid(),
    ordem: z.number().int().positive()
  })
);

export type ReordenarModulosDto = z.infer<typeof ReordenarModulosSchema>;