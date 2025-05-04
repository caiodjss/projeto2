import { z } from 'zod';

export const CriarAvaliacaoSchema = z.object({
  titulo: z.string().min(3),
  descricao: z.string().min(10),
  moduloId: z.string().uuid()
});

export type CriarAvaliacaoDto = z.infer<typeof CriarAvaliacaoSchema>;