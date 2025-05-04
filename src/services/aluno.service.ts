import prisma from '../prisma';

export class AlunoService {
  async getTurmasMatriculadas(alunoId: string) {
    return await prisma.usuario.findUnique({
      where: { id: alunoId },
      include: {
        turmasMatriculadas: {
          include: {
            curso: true,
            professor: true,
          },
        },
      },
    });
  }

  async getProgressoPorVideo(alunoId: string) {
    return await prisma.progressoAluno.findMany({
      where: {
        alunoId,
        videoId: { not: null },
      },
      include: {
        video: {
          include: {
            modulo: {
              include: {
                curso: true,
              },
            },
          },
        },
      },
    });
  }

  async getProgressoGeralCurso(alunoId: string, cursoId: string) {
    const modulos = await prisma.modulo.findMany({
      where: { cursoId },
      include: {
        videos: true,
        apostilas: true,
        avaliacoes: true,
      },
    });
  
    const progressos = await prisma.progressoAluno.findMany({
      where: { alunoId },
    });
  
    let totalItens = 0;
    let itensConcluidos = 0;
  
    modulos.forEach((modulo) => {
      modulo.videos.forEach((video) => {
        totalItens++;
        const progresso = progressos.find((p) => p.videoId === video.id);
        if (progresso?.progressoVideo === 100) itensConcluidos++; // Usando progressoVideo
      });
  
      modulo.apostilas.forEach((apostila) => {
        totalItens++;
        const progresso = progressos.find((p) => p.apostilaId === apostila.id);
        if (progresso?.baixouApostila) itensConcluidos++;
      });
  
      modulo.avaliacoes.forEach((avaliacao) => {
        totalItens++;
        const progresso = progressos.find((p) => p.avaliacaoId === avaliacao.id);
        if (progresso?.notaAvaliacao !== null) itensConcluidos++;
      });
    });
  
    return {
      porcentagem: totalItens > 0 ? Math.round((itensConcluidos / totalItens) * 100) : 0,
      totalItens,
      itensConcluidos,
    };
  }

  async getMensagens(alunoId: string) {
    return await prisma.mensagem.findMany({
      where: {
        destinatarioId: alunoId,
        deletada: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        remetente: true,
        turma: true,
      },
    });
  }
}