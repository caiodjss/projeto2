import { PrismaClient } from '@prisma/client';
import { TipoBeneficio } from '@prisma/client';
import { PlanoService } from './plano.service';

const prisma = new PrismaClient();

export class PlanoBasicoService {
  private planoService: PlanoService;

  constructor(planoService?: PlanoService) {
    this.planoService = planoService || new PlanoService();
  }

  async obterLinksWhatsApp(usuarioId: string) {
    const temAcesso = await this.planoService.verificarAcesso(
      usuarioId, 
      TipoBeneficio.GRUPO_WHATSAPP
    );

    if (!temAcesso) {
      throw new Error('Seu plano não inclui acesso a grupos de WhatsApp');
    }

    return await prisma.beneficioPlano.findMany({
      where: { 
        plano: { usuarios: { some: { id: usuarioId } } },
        tipo: TipoBeneficio.GRUPO_WHATSAPP 
      }
    });
  }
}