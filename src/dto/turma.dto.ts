import { z } from 'zod';
import { StatusTurma } from '@prisma/client';

export const CriarTurmaSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  cursoId: z.string().uuid("ID do curso inválido"),
  professorId: z.string().uuid("ID do professor inválido"),
  dataInicio: z.string().datetime({ message: "Data inválida, use formato ISO 8601" }),
  dataFim: z.string().datetime({ message: "Data inválida, use formato ISO 8601" })
}).refine(data => new Date(data.dataFim) > new Date(data.dataInicio), {
  message: "Data de término deve ser após a data de início",
  path: ["dataFim"]
});

export type CriarTurmaDto = z.infer<typeof CriarTurmaSchema>;

export const AtualizarTurmaSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").optional(),
  cursoId: z.string().uuid("ID do curso inválido").optional(),
  professorId: z.string().uuid("ID do professor inválido").optional(),
  dataInicio: z.string().datetime({ message: "Data inválida" }).optional(),
  dataFim: z.string().datetime({ message: "Data inválida" }).optional(),
  status: z.nativeEnum(StatusTurma, {
    errorMap: () => ({ message: "Status inválido" })
  }).optional()
}).partial();

export type AtualizarTurmaDto = z.infer<typeof AtualizarTurmaSchema>;

export const MatricularAlunoSchema = z.object({
  alunoId: z.string().uuid("ID do aluno inválido")
});

export type MatricularAlunoDto = z.infer<typeof MatricularAlunoSchema>;

export const DesmatricularAlunoSchema = z.object({
  alunoId: z.string().uuid("ID do aluno inválido")
});

export type DesmatricularAlunoDto = z.infer<typeof DesmatricularAlunoSchema>;

export const FiltrarTurmasSchema = z.object({
  cursoId: z.string().uuid("ID do curso inválido").optional(),
  professorId: z.string().uuid("ID do professor inválido").optional(),
  status: z.nativeEnum(StatusTurma, {
    errorMap: () => ({ message: "Status inválido" })
  }).optional()
});

export type FiltrarTurmasDto = z.infer<typeof FiltrarTurmasSchema>;