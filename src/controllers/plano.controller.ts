import { Request, Response } from 'express';
import prisma from '../config/database';
import { CriarPlanoDto, AtualizarPlanoDto } from '../dto/plano.dto';

export const criarPlano = async (req: Request, res: Response) => {
  try {
    const plano = await prisma.plano.create({
      data: req.body
    });
    res.status(201).json(plano);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar plano' });
  }
};

export const listarPlanos = async (req: Request, res: Response) => {
  try {
    const planos = await prisma.plano.findMany();
    res.json(planos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar planos' });
  }
};

export const obterPlanoPorId = async (req: Request, res: Response) => {
  try {
    const plano = await prisma.plano.findUnique({
      where: { id: req.params.id }
    });
    if (!plano) return res.status(404).json({ error: 'Plano não encontrado' });
    res.json(plano);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter plano' });
  }
};

export const atualizarPlano = async (req: Request, res: Response) => {
  try {
    const plano = await prisma.plano.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(plano);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar plano' });
  }
};

export const excluirPlano = async (req: Request, res: Response) => {
  try {
    await prisma.plano.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir plano' });
  }
};