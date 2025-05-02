import { Curso, Usuario } from '@prisma/client';

export type ProfessorBasico = Pick<Usuario, 'id' | 'nome' | 'email'>;
export type AlunoBasico = Pick<Usuario, 'id' | 'nome'>;

export type PrismaCurso = Curso & {
  professor: ProfessorBasico;
  alunos?: AlunoBasico[];
};