import { z } from 'zod';

export const CriarMensagemSchema = z.object({
  destinatarioId: z.string().uuid(),
  conteudo: z.string().max(1000),
  turmaId: z.string().uuid().optional(),
});

export const FiltrarMensagensSchema = z.object({
  turmaId: z.string().uuid().optional(),
});

// Exportando os tipos TypeScript
export type CriarMensagemInput = z.infer<typeof CriarMensagemSchema>;
export type FiltrarMensagensInput = z.infer<typeof FiltrarMensagensSchema>;