import { Request, Response } from 'express';
import prisma from '../prisma'; // Agora deve funcionar
import { 
  CriarMensagemInput, 
  FiltrarMensagensInput 
} from '../dto/mensagem.dto'; // Agora deve funcionar

export const enviarMensagem = async (req: Request, res: Response) => {
  try {
    const { destinatarioId, conteudo, turmaId } = req.body as CriarMensagemInput;
    
    if (!req.usuario) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const mensagem = await prisma.mensagem.create({
      data: {
        remetenteId: req.usuario.id,
        destinatarioId,
        conteudo,
        turmaId: turmaId || null
      },
      include: {
        remetente: true,
        destinatario: true,
        turma: turmaId ? true : false
      }
    });

    return res.status(201).json(mensagem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao enviar mensagem' });
  }
};

export const listarMensagens = async (req: Request, res: Response) => {
  try {
    const { turmaId } = req.query as FiltrarMensagensInput;
    
    if (!req.usuario) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const mensagens = await prisma.mensagem.findMany({
      where: {
        OR: [
          { remetenteId: req.usuario.id },
          { destinatarioId: req.usuario.id }
        ],
        turmaId: turmaId || undefined,
        deletada: false
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        remetente: true,
        destinatario: true,
        turma: turmaId ? true : false
      }
    });

    return res.status(200).json(mensagens);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao listar mensagens' });
  }
};

export const marcarComoLida = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.usuario) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const mensagem = await prisma.mensagem.update({
      where: { id },
      data: { lida: true }
    });

    return res.status(200).json(mensagem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao marcar mensagem como lida' });
  }
};

export const excluirMensagem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.usuario) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    // Verifica se o usuário é o remetente ou destinatário
    const mensagem = await prisma.mensagem.findUnique({
      where: { id }
    });

    if (!mensagem) {
      return res.status(404).json({ message: 'Mensagem não encontrada' });
    }

    if (mensagem.remetenteId !== req.usuario.id && mensagem.destinatarioId !== req.usuario.id) {
      return res.status(403).json({ message: 'Você não tem permissão para excluir esta mensagem' });
    }

    await prisma.mensagem.update({
      where: { id },
      data: { deletada: true }
    });

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao excluir mensagem' });
  }
};