import prisma from '../prisma';
import { TipoBeneficio } from '@prisma/client';

export class PlanoService {
  async verificarAcesso(usuarioId: string, beneficioRequerido: TipoBeneficio): Promise<boolean> {
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { id: usuarioId },
        include: { 
          plano: { 
            include: { 
              beneficios: {
                where: { ativo: true }
              } 
            } 
          } 
        }
      });

      if (!usuario?.plano) {
        throw new Error('Usuário não possui plano ativo');
      }

      return usuario.plano.beneficios.some(
        beneficio => beneficio.tipo === beneficioRequerido
      );
    } catch (error) {
      console.error('Erro ao verificar acesso:', error);
      throw new Error('Falha ao verificar acesso ao benefício');
    }
  }

  async obterBeneficios(planoId: string) {
    return await prisma.beneficioPlano.findMany({
      where: { 
        planoId, 
        ativo: true 
      },
      orderBy: {
        tipo: 'asc'
      }
    });
  }

  async listarPlanosComBeneficios() {
    return await prisma.plano.findMany({
      include: {
        beneficios: {
          where: { ativo: true },
          orderBy: { tipo: 'asc' }
        }
      },
      orderBy: {
        preco: 'asc'
      }
    });
  }
}