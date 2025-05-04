import { z } from 'zod';

export const CriarVideoSchema = z.object({
  titulo: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  urlVideo: z.string().url("URL inválida").includes('youtube|vimeo', { 
    message: "URL deve ser do YouTube ou Vimeo" 
  }),
  duracao: z.number().int("Duração deve ser em minutos inteiros").positive("Duração deve ser positiva"),
  moduloId: z.string().uuid("ID do módulo inválido")
});

export type CriarVideoDto = z.infer<typeof CriarVideoSchema>;

export const AtualizarVideoSchema = z.object({
  titulo: z.string().min(3).optional(),
  urlVideo: z.string().url().optional(),
  duracao: z.number().int().positive().optional()
});

export type AtualizarVideoDto = z.infer<typeof AtualizarVideoSchema>;