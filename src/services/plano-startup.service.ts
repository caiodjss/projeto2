import { PrismaClient } from '@prisma/client';
import { TipoBeneficio } from '@prisma/client';
import { PlanoService } from './plano.service';
import { PlanoEmpreendedorService } from './plano-empreendedor.service';

const prisma = new PrismaClient();

export class PlanoStartupService extends PlanoEmpreendedorService {
  constructor(planoService?: PlanoService) {
    super(planoService);
  }

  async iniciarModelagemNegocio(usuarioId: string, dados: any) {
    const temAcesso = await this.planoService.verificarAcesso(
      usuarioId, 
      TipoBeneficio.MODELAGEM_NEGOCIOS
    );

    if (!temAcesso) {
      throw new Error('Seu plano não inclui modelagem de negócios');
    }

    return await prisma.modelagemNegocio.create({
      data: {
        usuarioId,
        dados,
        etapa: 'INICIAL'
      }
    });
  }
}