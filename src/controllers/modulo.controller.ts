import { Request, Response } from 'express';
import prisma from '../config/database';
import { CriarModuloDto, AtualizarModuloDto, ReordenarModulosDto } from '../dto/modulo.dto';

// Criar um novo módulo
export const criarModulo = async (req: Request, res: Response) => {
  try {
    const modulo: CriarModuloDto = req.body;

    const novoModulo = await prisma.modulo.create({
      data: modulo
    });

    res.status(201).json(novoModulo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar módulo' });
  }
};

// Listar todos os módulos de um curso específico
export const listarModulosPorCurso = async (req: Request, res: Response) => {
  try {
    const cursoId = req.params.cursoId;

    const modulos = await prisma.modulo.findMany({
      where: { cursoId },
      orderBy: { ordem: 'asc' }
    });

    res.json(modulos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar módulos' });
  }
};

// Atualizar um módulo existente
export const atualizarModulo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const dadosAtualizados: AtualizarModuloDto = req.body;

    const moduloAtualizado = await prisma.modulo.update({
      where: { id },
      data: dadosAtualizados
    });

    res.json(moduloAtualizado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar módulo' });
  }
};

// Excluir um módulo
export const excluirModulo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    await prisma.modulo.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir módulo' });
  }
};

// Reordenar múltiplos módulos
export const reordenarModulos = async (req: Request, res: Response) => {
  try {
    const modulos = req.body as ReordenarModulosDto;

    const updates = modulos.map(item =>
      prisma.modulo.update({
        where: { id: item.id },
        data: { ordem: item.ordem }
      })
    );

    await prisma.$transaction(updates);

    res.status(200).json({ message: 'Módulos reordenados com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Erro ao reordenar módulos' });
  }
};
