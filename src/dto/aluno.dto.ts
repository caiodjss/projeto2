import { z } from 'zod';

export const FiltrarTurmasSchema = z.object({
  alunoId: z.string().uuid().optional(),
});

export type FiltrarTurmasInput = z.infer<typeof FiltrarTurmasSchema>;