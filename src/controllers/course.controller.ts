import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { Prisma } from '@prisma/client';

export type CursoCompleto = Prisma.CursoGetPayload<{
  include: {
    professor: true;
    alunos: true;
    turmas: { select: { id: true } };
  }
}>;

export type CreateCursoInput = {
  titulo: string;
  professorId: string;
  descricao?: string;
  categoria?: string;
  cargaHoraria?: number;
};

export type UpdateCursoInput = Partial<CreateCursoInput> & {
  id: string;
};

export const getCourses = async (req: Request, res: Response<CursoCompleto[] | { error: string }>) => {
  try {
    const cursos = await prisma.curso.findMany({
      include: {
        professor: {
          where: { tipo: 'PROFESSOR' },
          select: { id: true, nome: true, email: true }
        },
        alunos: {
          where: { tipo: 'ALUNO' },
          select: { id: true, nome: true }
        },
        turmas: { select: { id: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(cursos);
  } catch (error) {
    console.error('Erro ao buscar cursos:', error);
    res.status(500).json({ error: 'Erro ao buscar cursos' });
  }
};

export const getCourseById = async (
  req: Request<{ id: string }>,
  res: Response<CursoCompleto | { error: string }>
) => {
  try {
    const curso = await prisma.curso.findUnique({
      where: { id: req.params.id },
      include: {
        professor: {
          select: { id: true, nome: true, email: true }
        },
        alunos: {
          select: { id: true, nome: true }
        },
        turmas: { select: { id: true } }
      }
    });
    curso ? res.json(curso) : res.status(404).json({ error: 'Curso não encontrado' });
  } catch (error) {
    console.error('Erro ao buscar curso:', error);
    res.status(500).json({ error: 'Erro ao buscar curso' });
  }
};

export const createCourse = async (
  req: Request<{}, {}, CreateCursoInput>,
  res: Response<CursoCompleto | { error: string }>
) => {
  try {
  
    if (!req.body.titulo || !req.body.professorId) {
      return res.status(400).json({ error: 'Título e ID do professor são obrigatórios' });
    }

  
    const professor = await prisma.usuario.findUnique({
      where: { id: req.body.professorId, tipo: 'PROFESSOR' }
    });
    if (!professor) return res.status(400).json({ error: 'Professor não encontrado' });

    const curso = await prisma.curso.create({
      data: {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        categoria: req.body.categoria,
        cargaHoraria: req.body.cargaHoraria,
        professorId: req.body.professorId
      },
      include: {
        professor: { select: { id: true, nome: true, email: true } },
        alunos: { select: { id: true, nome: true } },
        turmas: { select: { id: true } }
      }
    });

    res.status(201).json(curso);
  } catch (error) {
    console.error('Erro ao criar curso:', error);
    res.status(500).json({ error: 'Erro ao criar curso' });
  }
};

export const updateCourse = async (
  req: Request<{ id: string }, {}, UpdateCursoInput>,
  res: Response<CursoCompleto | { error: string }>
) => {
  try {
    const cursoAtualizado = await prisma.curso.update({
      where: { id: req.params.id },
      data: req.body,
      include: {
        professor: { select: { id: true, nome: true, email: true } },
        alunos: { select: { id: true, nome: true } },
        turmas: { select: { id: true } }
      }
    });
    res.json(cursoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar curso:', error);
    res.status(500).json({ error: 'Erro ao atualizar curso' });
  }
};

export const deleteCourse = async (
  req: Request<{ id: string }>,
  res: Response<{ success: string } | { error: string }>
) => {
  try {
    await prisma.curso.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (error) {
    console.error('Erro ao deletar curso:', error);
    res.status(500).json({ error: 'Erro ao deletar curso' });
  }
};