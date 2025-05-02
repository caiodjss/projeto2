import { Curso, Professor, Aluno } from '@prisma/client';

export type AlunoBasico = {
  id: string;
  nome: string;
};

export type ProfessorBasico = {
  id: string;
  nome: string;
  email: string;
};

export type CursoCompleto = Curso & {
  professor: ProfessorBasico;
  alunos?: AlunoBasico[];
};

export type CreateCursoInput = {
  titulo: string;
  professorId: string;
  descricao?: string;
  categoria?: string;
  cargaHoraria?: number | string;
};

export type UpdateCursoInput = Partial<Omit<CreateCursoInput, 'professorId'>> & {
  id: string;
  professorId?: string;
};