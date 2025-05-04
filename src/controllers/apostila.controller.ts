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

// ... (listarPorModulo, atualizar, excluir - padrão similar aos vídeos)