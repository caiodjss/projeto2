import { Prisma } from '@prisma/client';
import prisma from '../config/database';

export const trackVideoProgress = async (
  userId: string,
  videoId: string,
  progress: number
) => {
  return await prisma.progressoAluno.upsert({
    where: { 
      alunoId_videoId: {
        alunoId: userId,
        videoId: videoId
      }
    },
    update: { 
      progressoVideo: progress,
      dataUltimaInteracao: new Date()
    },
    create: {
      alunoId: userId,
      videoId: videoId,
      progressoVideo: progress,
      dataUltimaInteracao: new Date()
    }
  });
};

export const markMaterialDownloaded = async (
  userId: string,
  apostilaId: string
) => {
  return await prisma.progressoAluno.upsert({
    where: { 
      alunoId_apostilaId: {
        alunoId: userId,
        apostilaId: apostilaId
      }
    },
    update: { 
      baixouApostila: true,
      dataUltimaInteracao: new Date()
    },
    create: {
      alunoId: userId,
      apostilaId: apostilaId,
      baixouApostila: true,
      dataUltimaInteracao: new Date()
    }
  });
};

export const submitAssessment = async (
  userId: string,
  avaliacaoId: string,
  nota: number
) => {
  return await prisma.progressoAluno.upsert({
    where: { 
      alunoId_avaliacaoId: {
        alunoId: userId,
        avaliacaoId: avaliacaoId
      }
    },
    update: { 
      notaAvaliacao: nota,
      dataUltimaInteracao: new Date()
    },
    create: {
      alunoId: userId,
      avaliacaoId: avaliacaoId,
      notaAvaliacao: nota,
      dataUltimaInteracao: new Date()
    }
  });
};

export const getFullCourseProgress = async (
  userId: string,
  courseId: string
) => {
  // Verificar matrícula
  const enrollment = await prisma.turma.findFirst({
    where: {
      cursoId: courseId,
      alunos: {
        some: { id: userId }
      }
    }
  });

  if (!enrollment) {
    throw new Error('Aluno não matriculado neste curso');
  }

  // Obter estrutura do curso
  const course = await prisma.curso.findUnique({
    where: { id: courseId },
    include: {
      modulos: {
        include: {
          videos: { select: { id: true } },
          apostilas: { select: { id: true } },
          avaliacoes: { select: { id: true } }
        },
        orderBy: { ordem: 'asc' }
      }
    }
  });

  if (!course) {
    throw new Error('Curso não encontrado');
  }

  // Obter todos os progressos do aluno neste curso
  const progressRecords = await prisma.progressoAluno.findMany({
    where: {
      alunoId: userId,
      OR: [
        { video: { modulo: { cursoId: courseId } } },
        { apostila: { modulo: { cursoId: courseId } } },
        { avaliacao: { modulo: { cursoId: courseId } } }
      ]
    }
  });

  // Calcular totais
  const totalVideos = course.modulos.reduce((sum, mod) => sum + mod.videos.length, 0);
  const totalMaterials = course.modulos.reduce((sum, mod) => sum + mod.apostilas.length, 0);
  const totalAssessments = course.modulos.reduce((sum, mod) => sum + mod.avaliacoes.length, 0);

  // Calcular progresso
  const completedVideos = progressRecords.filter(p => p.progressoVideo && p.progressoVideo >= 95).length;
  const downloadedMaterials = progressRecords.filter(p => p.baixouApostila).length;
  const completedAssessments = progressRecords.filter(p => p.notaAvaliacao !== null).length;

  // Calcular porcentagens
  const videoProgress = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;
  const materialProgress = totalMaterials > 0 ? Math.round((downloadedMaterials / totalMaterials) * 100) : 0;
  const assessmentProgress = totalAssessments > 0 ? Math.round((completedAssessments / totalAssessments) * 100) : 0;

  // Progresso total ponderado
  const totalProgress = Math.round(
    (videoProgress * 0.5) + 
    (materialProgress * 0.3) + 
    (assessmentProgress * 0.2)
  );

  return {
    courseId,
    courseTitle: course.titulo,
    totalProgress,
    modules: course.modulos.map(mod => ({
      id: mod.id,
      title: mod.titulo,
      videoProgress: mod.videos.length > 0 
        ? Math.round((progressRecords.filter(p => 
            p.videoId && mod.videos.some(v => v.id === p.videoId) && 
            (p.progressoVideo || 0) >= 95
          ).length / mod.videos.length) * 100)
        : 0,
      materialProgress: mod.apostilas.length > 0
        ? Math.round((progressRecords.filter(p =>
            p.apostilaId && mod.apostilas.some(a => a.id === p.apostilaId) &&
            p.baixouApostila
          ).length / mod.apostilas.length) * 100)
        : 0,
      assessmentProgress: mod.avaliacoes.length > 0
        ? Math.round((progressRecords.filter(p =>
            p.avaliacaoId && mod.avaliacoes.some(a => a.id === p.avaliacaoId) &&
            p.notaAvaliacao !== null
          ).length / mod.avaliacoes.length) * 100)
        : 0
    })),
    details: {
      videos: {
        completed: completedVideos,
        total: totalVideos,
        progress: videoProgress
      },
      materials: {
        downloaded: downloadedMaterials,
        total: totalMaterials,
        progress: materialProgress
      },
      assessments: {
        completed: completedAssessments,
        total: totalAssessments,
        progress: assessmentProgress
      }
    }
  };
};

// Alternative methods if composite keys don't work
export const findVideoProgress = async (userId: string, videoId: string) => {
  return await prisma.progressoAluno.findFirst({
    where: {
      alunoId: userId,
      videoId: videoId
    }
  });
};

export const findMaterialProgress = async (userId: string, apostilaId: string) => {
  return await prisma.progressoAluno.findFirst({
    where: {
      alunoId: userId,
      apostilaId: apostilaId
    }
  });
};

export const findAssessmentProgress = async (userId: string, avaliacaoId: string) => {
  return await prisma.progressoAluno.findFirst({
    where: {
      alunoId: userId,
      avaliacaoId: avaliacaoId
    }
  });
};