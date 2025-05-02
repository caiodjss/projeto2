// src/types/prisma-types.ts
import { Curso, Usuario } from '@prisma/client';

export type ProfessorBasico = Pick<Usuario, 'id' | 'nome' | 'email'>;
export type AlunoBasico = Pick<Usuario, 'id' | 'nome'>;

export type CursoCompleto = Curso & {
  professor: ProfessorBasico;
  alunos: AlunoBasico[];
  modulos?: {
    id: string;
    titulo: string;
    ordem: number;
  }[];
};

export type UsuarioComPlano = Usuario & {
  plano?: {
    id: string;
    nome: string;
  };
};