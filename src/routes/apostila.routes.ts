import { Request, Response } from 'express';
import prisma from '../config/database';
import { CriarApostilaDto, AtualizarApostilaDto } from '../dto/apostila.dto';

export const criarApostila = async (req: Request, res: Response) => {
  try {
    const apostila = await prisma.apostila.create({
      data: req.body
    });
    res.status(201).json(apostila);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar apostila' });
  }
};

export const listarApostilasPorModulo = async (req: Request, res: Response) => {
  try {
    const apostilas = await prisma.apostila.findMany({
      where: { moduloId: req.params.moduloId }
    });
    res.json(apostilas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar apostilas' });
  }
};

export const atualizarApostila = async (req: Request, res: Response) => {
  try {
    const apostila = await prisma.apostila.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(apostila);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar apostila' });
  }
};

export const excluirApostila = async (req: Request, res: Response) => {
  try {
    await prisma.apostila.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir apostila' });
  }
};