import { Request, Response } from 'express';
import prisma from '../config/database';

export const listarAvaliacoesPorModulo = async (req: Request, res: Response) => {
  try {
    const avaliacoes = await prisma.avaliacao.findMany({
      where: { moduloId: req.params.moduloId }
    });
    res.json(avaliacoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar avaliações' });
  }
};

export const criarAvaliacao = async (req: Request, res: Response) => {
  try {
    const avaliacao = await prisma.avaliacao.create({
      data: {
        ...req.body,
        // MVP: Adiciona campos padrão
        notaMinima: 6,
        tentativasPermitidas: 3
      }
    });
    res.status(201).json(avaliacao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar avaliação' });
  }
};

// ... (outros métodos CRUD)