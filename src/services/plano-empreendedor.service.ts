import { PrismaClient } from '@prisma/client';
import { TipoBeneficio } from '@prisma/client';
import { PlanoService } from './plano.service';

const prisma = new PrismaClient();

export class PlanoEmpreendedorService {
  protected planoService: PlanoService;

  constructor(planoService?: PlanoService) {
    this.planoService = planoService || new PlanoService();
  }

  async agendarMentoria(usuarioId: string, data: Date, tema: string) {
    const temAcesso = await this.planoService.verificarAcesso(
      usuarioId, 
      TipoBeneficio.MENTORIAS
    );

    if (!temAcesso) {
      throw new Error('Seu plano não inclui mentorias');
    }

    return await prisma.mentoria.create({
      data: {
        usuarioId,
        data,
        tema,
        status: 'AGENDADA'
      }
    });
  }
}