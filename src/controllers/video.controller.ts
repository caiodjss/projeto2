import { Request, Response } from 'express';
import prisma from '../config/database';
import { CriarVideoDto, AtualizarVideoDto } from '../dto/video.dto';

export const criarVideo = async (req: Request, res: Response) => {
  try {
    const video = await prisma.video.create({
      data: req.body
    });
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar vídeo' });
  }
};

export const listarVideosPorModulo = async (req: Request, res: Response) => {
  try {
    const videos = await prisma.video.findMany({
      where: { moduloId: req.params.moduloId }
    });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar vídeos' });
  }
};

export const atualizarVideo = async (req: Request, res: Response) => {
  try {
    const video = await prisma.video.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar vídeo' });
  }
};

export const excluirVideo = async (req: Request, res: Response) => {
  try {
    await prisma.video.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir vídeo' });
  }
};