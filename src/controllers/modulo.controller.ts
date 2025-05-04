import { Request, Response } from 'express';
import prisma from '../config/database';
import { CriarModuloDto, AtualizarModuloDto, ReordenarModulosDto } from '../dto/modulo.dto';

export const criarModulo = async (req: Request, res: Response) => {
  try {
    const modulo = await prisma.modulo.create({
      data: req.body
    });
    res.status(201).json(modulo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar módulo' });
  }
};

export const listarModulosPorCurso = async (req: Request, res: Response) => {
  try {
    const modulos = await prisma.modulo.findMany({
      where: { cursoId: req.params.cursoId },
      orderBy: { ordem: 'asc' }
    });
    res.json(modulos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar módulos' });
  }
};

export const atualizarModulo = async (req: Request, res: Response) => {
  try {
    const modulo = await prisma.modulo.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(modulo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar módulo' });
  }
};

export const excluirModulo = async (req: Request, res: Response) => {
  try {
    await prisma.modulo.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir módulo' });
  }
};

export const reordenarModulos = async (req: Request, res: Response) => {
  try {
    const updates = (req.body as ReordenarModulosDto).map(item =>
      prisma.modulo.update({
        where: { id: item.id },
        data: { ordem: item.ordem }
      })
    );
    
    await prisma.$transaction(updates);
    res.status(200).json({ message: 'Módulos reordenados' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao reordenar módulos' });
  }
};