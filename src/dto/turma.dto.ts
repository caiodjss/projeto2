import { z } from 'zod';
import { StatusTurma } from '@prisma/client';

export const CriarTurmaSchema = z.object({
  nome: z.string().min(3, 'Nome da turma deve ter no mínimo 3 caracteres'),
  cursoId: z.string().uuid('ID do curso inválido'),
  professorId: z.string().uuid('ID do professor inválido'),
  dataInicio: z.string().datetime('Formato de data/hora inválido'),
  dataFim: z.string().datetime('Formato de data/hora inválido'),
});
export type CriarTurmaDto = z.infer<typeof CriarTurmaSchema>;

export const AtualizarTurmaSchema = z.object({
  nome: z.string().min(3, 'Nome da turma deve ter no mínimo 3 caracteres').optional(),
  cursoId: z.string().uuid('ID do curso inválido').optional(),
  professorId: z.string().uuid('ID do professor inválido').optional(),
  dataInicio: z.string().datetime('Formato de data/hora inválido').optional(),
  dataFim: z.string().datetime('Formato de data/hora inválido').optional(),
  status: z.nativeEnum(StatusTurma).optional(),
});
export type AtualizarTurmaDto = z.infer<typeof AtualizarTurmaSchema>;

export const MatricularAlunoSchema = z.object({
  alunoId: z.string().uuid('ID do aluno inválido'),
});
export type MatricularAlunoDto = z.infer<typeof MatricularAlunoSchema>;

export const DesmatricularAlunoSchema = z.object({
  alunoId: z.string().uuid('ID do aluno inválido'),
});
export type DesmatricularAlunoDto = z.infer<typeof DesmatricularAlunoSchema>;

export const FiltrarTurmasSchema = z.object({
  cursoId: z.string().uuid('ID do curso inválido').optional(),
  professorId: z.string().uuid('ID do professor inválido').optional(),
  status: z.nativeEnum(StatusTurma).optional(),
});
export type FiltrarTurmasDto = z.infer<typeof FiltrarTurmasSchema>;