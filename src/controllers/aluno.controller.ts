import { Request, Response } from 'express';
import { AlunoService } from '../services/aluno.service';
import { FiltrarTurmasInput } from '../dto/aluno.dto';

const alunoService = new AlunoService();

export class AlunoController {
  async getTurmasMatriculadas(req: Request, res: Response) {
    try {
      if (!req.usuario) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
      }

      const turmas = await alunoService.getTurmasMatriculadas(req.usuario.id);
      return res.status(200).json(turmas?.turmasMatriculadas || []);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar turmas' });
    }
  }

  async getProgressoVideos(req: Request, res: Response) {
    try {
      if (!req.usuario) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
      }

      const progressos = await alunoService.getProgressoPorVideo(req.usuario.id);
      return res.status(200).json(progressos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar progresso' });
    }
  }

  async getProgressoCurso(req: Request, res: Response) {
    try {
      if (!req.usuario) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
      }

      const { cursoId } = req.params;
      const progresso = await alunoService.getProgressoGeralCurso(req.usuario.id, cursoId);
      return res.status(200).json(progresso);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao calcular progresso' });
    }
  }

  async getMensagens(req: Request, res: Response) {
    try {
      if (!req.usuario) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
      }

      const mensagens = await alunoService.getMensagens(req.usuario.id);
      return res.status(200).json(mensagens);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar mensagens' });
    }
  }

  async enviarMensagem(req: Request, res: Response) {
    try {
      if (!req.usuario) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
      }

      // Implementação do envio de mensagem
      // (pode reutilizar o controller de mensagens existente)
      return res.status(200).json({ message: 'Mensagem enviada' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao enviar mensagem' });
    }
  }
}