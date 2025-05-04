import { Request, Response } from 'express';
import prisma from '../config/database';
import { CriarTurmaDto, AtualizarTurmaDto, MatricularAlunoDto, DesmatricularAlunoDto, FiltrarTurmasDto, CriarTurmaSchema } from '../dto/turma.dto';

export const criarTurma = async (req: Request<{}, {}, CriarTurmaDto>, res: Response) => {
  console.log('Dados recebidos:', req.body);
  console.log('Dados recebidos (RAW):', req.body);
  console.log('Validação:', CriarTurmaSchema.safeParse(req.body));
  try {
    const novaTurma = await prisma.turma.create({
      data: req.body,
    });
    res.status(201).json(novaTurma);
  } catch (error) {
    console.error('Erro ao criar turma:', error);
    res.status(500).json({ error: 'Erro interno ao criar turma' });
  }
};

export const listarTurmas = async (req: Request<{}, {}, {}, FiltrarTurmasDto>, res: Response) => {
  try {
    const { cursoId, professorId, status } = req.query;
    const where = {
      ...(cursoId && { cursoId }),
      ...(professorId && { professorId }),
      ...(status && { status }),
    };
    const turmas = await prisma.turma.findMany({
      where,
      include: {
        curso: { select: { id: true, titulo: true } },
        professor: { select: { id: true, nome: true, email: true } },
      },
    });
    res.json(turmas);
  } catch (error) {
    console.error('Erro ao listar turmas:', error);
    res.status(500).json({ error: 'Erro interno ao listar turmas' });
  }
};

export const obterTurmaPorId = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const turma = await prisma.turma.findUnique({
      where: { id: req.params.id },
      include: {
        curso: { select: { id: true, titulo: true } },
        professor: { select: { id: true, nome: true, email: true } },
        alunos: { select: { id: true, nome: true, email: true } },
      },
    });
    if (!turma) {
      return res.status(404).json({ error: 'Turma não encontrada' });
    }
    res.json(turma);
  } catch (error) {
    console.error('Erro ao obter turma:', error);
    res.status(500).json({ error: 'Erro interno ao obter turma' });
  }
};

export const atualizarTurma = async (req: Request<{ id: string }, {}, AtualizarTurmaDto>, res: Response) => {
  try {
    const turmaAtualizada = await prisma.turma.update({
      where: { id: req.params.id },
      data: req.body,
      include: {
        curso: { select: { id: true, titulo: true } },
        professor: { select: { id: true, nome: true, email: true } },
      },
    });
    res.json(turmaAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar turma:', error);
    res.status(500).json({ error: 'Erro interno ao atualizar turma' });
  }
};

export const excluirTurma = async (req: Request<{ id: string }>, res: Response) => {
  try {
    await prisma.turma.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir turma:', error);
    res.status(500).json({ error: 'Erro interno ao excluir turma' });
  }
};

export const matricularAluno = async (req: Request<{ id: string }, {}, MatricularAlunoDto>, res: Response) => {
  try {
    const { alunoId } = req.body;
    const turmaId = req.params.id;

    const turma = await prisma.turma.update({
      where: { id: turmaId },
      data: {
        alunos: {
          connect: { id: alunoId },
        },
      },
      include: { alunos: true },
    });

    res.json(turma);
  } catch (error) {
    console.error('Erro ao matricular aluno:', error);
    res.status(500).json({ error: 'Erro interno ao matricular aluno' });
  }
};

export const desmatricularAluno = async (req: Request<{ id: string }, {}, DesmatricularAlunoDto>, res: Response) => {
  try {
    const { alunoId } = req.body;
    const turmaId = req.params.id;

    const turma = await prisma.turma.update({
      where: { id: turmaId },
      data: {
        alunos: {
          disconnect: { id: alunoId },
        },
      },
      include: { alunos: true },
    });

    res.json(turma);
  } catch (error) {
    console.error('Erro ao desmatricular aluno:', error);
    res.status(500).json({ error: 'Erro interno ao desmatricular aluno' });
  }
};

export const listarAlunosDaTurma = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const turma = await prisma.turma.findUnique({
      where: { id: req.params.id },
      include: {
        alunos: { select: { id: true, nome: true, email: true } },
      },
    });
    if (!turma) {
      return res.status(404).json({ error: 'Turma não encontrada' });
    }
    res.json(turma.alunos);
  } catch (error) {
    console.error('Erro ao listar alunos da turma:', error);
    res.status(500).json({ error: 'Erro interno ao listar alunos da turma' });
  }
};