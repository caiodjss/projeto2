import { prisma } from '../config/database';

export const trackVideoProgress = async (userId: string, videoId: string, progress: number) => {
  return await prisma.progressoAluno.upsert({
    where: { alunoId_videoId: { alunoId: userId, videoId } },
    update: { progressoVideo: progress },
    create: {
      alunoId: userId,
      videoId,
      progressoVideo: progress
    }
  });
};

export const getCourseProgress = async (userId: string, courseId: string) => {
  // Lógica para calcular progresso total
};