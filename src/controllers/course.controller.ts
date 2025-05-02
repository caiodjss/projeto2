// src/controllers/course.controller.ts
import { Request, Response } from 'express';
import prisma from '../config/database';
import { Curso, NivelCurso, Usuario } from '@prisma/client';

// Tipos customizados para os relacionamentos
type ProfessorBasico = Pick<Usuario, 'id' | 'nome' | 'email'>;
type ModuloBasico = {
  id: string;
  titulo: string;
  ordem: number;
};
type TurmaBasica = {
  id: string;
  nome: string;
};

type CursoCompleto = Curso & {
  professor: ProfessorBasico;
  modulos: ModuloBasico[];
  turmas: TurmaBasica[];
};

export const getCourses = async (req: Request, res: Response<CursoCompleto[] | { error: string }>) => {
  try {
    const cursos = await prisma.curso.findMany({
      include: {
        professor: {
          select: { id: true, nome: true, email: true }
        },
        modulos: {
          select: { id: true, titulo: true, ordem: true },
          orderBy: { ordem: 'asc' }
        },
        turmas: {
          select: { id: true, nome: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(cursos);
  } catch (error) {
    console.error('Erro ao buscar cursos:', error);
    res.status(500).json({ error: 'Erro interno ao buscar cursos' });
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
        modulos: {
          select: { id: true, titulo: true, ordem: true },
          orderBy: { ordem: 'asc' }
        },
        turmas: {
          select: { id: true, nome: true }
        }
      }
    });

    if (!curso) {
      return res.status(404).json({ error: 'Curso não encontrado' });
    }

    res.json(curso);
  } catch (error) {
    console.error('Erro ao buscar curso:', error);
    res.status(500).json({ error: 'Erro interno ao buscar curso' });
  }
};

export const createCourse = async (
  req: Request<{}, {}, {
    titulo: string;
    professorId: string;
    descricao?: string;
    categoria?: NivelCurso;
    cargaHoraria?: number;
  }>,
  res: Response<CursoCompleto | { error: string }>
) => {
  try {
    // Verifica se o professor existe
    const professor = await prisma.usuario.findUnique({
      where: { id: req.body.professorId, tipo: 'PROFESSOR' }
    });

    if (!professor) {
      return res.status(400).json({ error: 'Professor não encontrado' });
    }

    const novoCurso = await prisma.curso.create({
      data: {
        titulo: req.body.titulo,
        professorId: req.body.professorId,
        descricao: req.body.descricao,
        categoria: req.body.categoria,
        cargaHoraria: req.body.cargaHoraria
      },
      include: {
        professor: {
          select: { id: true, nome: true, email: true }
        },
        modulos: true,
        turmas: true
      }
    });

    res.status(201).json(novoCurso);
  } catch (error) {
    console.error('Erro ao criar curso:', error);
    res.status(500).json({ error: 'Erro interno ao criar curso' });
  }
};

export const updateCourse = async (
  req: Request<{ id: string }, {}, {
    titulo?: string;
    descricao?: string;
    categoria?: NivelCurso;
    cargaHoraria?: number;
  }>,
  res: Response<CursoCompleto | { error: string }>
) => {
  try {
    const cursoAtualizado = await prisma.curso.update({
      where: { id: req.params.id },
      data: req.body,
      include: {
        professor: {
          select: { id: true, nome: true, email: true }
        },
        modulos: true,
        turmas: true
      }
    });

    res.json(cursoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar curso:', error);
    res.status(500).json({ error: 'Erro interno ao atualizar curso' });
  }
};

export const deleteCourse = async (
  req: Request<{ id: string }>,
  res: Response<{ success: boolean } | { error: string }>
) => {
  try {
    await prisma.curso.delete({
      where: { id: req.params.id }
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar curso:', error);
    res.status(500).json({ error: 'Erro interno ao deletar curso' });
  }
};