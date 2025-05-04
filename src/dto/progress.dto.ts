import { z } from 'zod';

// Registrar progresso em vídeo
export const ProgressoVideoSchema = z.object({
  videoId: z.string().uuid('ID do vídeo inválido'),
  progresso: z.number().int().min(0).max(100, 'Progresso deve ser entre 0% e 100%'),
});
export type ProgressoVideoDto = z.infer<typeof ProgressoVideoSchema>;

// Marcar apostila como baixada
export const ApostilaBaixadaSchema = z.object({
  apostilaId: z.string().uuid('ID da apostila inválido'),
});
export type ApostilaBaixadaDto = z.infer<typeof ApostilaBaixadaSchema>;