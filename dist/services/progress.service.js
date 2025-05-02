"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseProgress = exports.trackVideoProgress = void 0;
const database_1 = require("../config/database");
const trackVideoProgress = async (userId, videoId, progress) => {
    return await database_1.prisma.progressoAluno.upsert({
        where: { alunoId_videoId: { alunoId: userId, videoId } },
        update: { progressoVideo: progress },
        create: {
            alunoId: userId,
            videoId,
            progressoVideo: progress
        }
    });
};
exports.trackVideoProgress = trackVideoProgress;
const getCourseProgress = async (userId, courseId) => {
    // Lógica para calcular progresso total
};
exports.getCourseProgress = getCourseProgress;
