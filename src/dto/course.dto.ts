import { z } from 'zod';
import { NivelCurso } from '@prisma/client';

// Criar Curso
export const CriarCursoSchema = z.object({
  titulo: z.string().min(1, 'Título é obrigatório'),
  professorId: z.string().uuid('ID do professor inválido'),
  descricao: z.string().optional(),
  categoria: z.nativeEnum(NivelCurso).optional(),
  cargaHoraria: z.number().int().positive().optional(),
});
export type CriarCursoDto = z.infer<typeof CriarCursoSchema>;

// Atualizar Curso
export const AtualizarCursoSchema = z.object({
  titulo: z.string().min(1, 'Título é obrigatório').optional(),
  descricao: z.string().optional(),
  categoria: z.nativeEnum(NivelCurso).optional(),
  cargaHoraria: z.number().int().positive().optional(),
});
export type AtualizarCursoDto = z.infer<typeof AtualizarCursoSchema>;