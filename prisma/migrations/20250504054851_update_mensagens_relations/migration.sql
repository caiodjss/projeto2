/*
  Warnings:

  - You are about to alter the column `conteudo` on the `mensagens` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - A unique constraint covering the columns `[alunoId,videoId]` on the table `progresso_aluno` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[alunoId,apostilaId]` on the table `progresso_aluno` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[alunoId,avaliacaoId]` on the table `progresso_aluno` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `mensagens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "mensagens" ADD COLUMN     "deletada" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "turmaId" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "conteudo" SET DATA TYPE VARCHAR(1000);

-- CreateIndex
CREATE INDEX "mensagens_remetenteId_idx" ON "mensagens"("remetenteId");

-- CreateIndex
CREATE INDEX "mensagens_destinatarioId_idx" ON "mensagens"("destinatarioId");

-- CreateIndex
CREATE UNIQUE INDEX "progresso_aluno_alunoId_videoId_key" ON "progresso_aluno"("alunoId", "videoId");

-- CreateIndex
CREATE UNIQUE INDEX "progresso_aluno_alunoId_apostilaId_key" ON "progresso_aluno"("alunoId", "apostilaId");

-- CreateIndex
CREATE UNIQUE INDEX "progresso_aluno_alunoId_avaliacaoId_key" ON "progresso_aluno"("alunoId", "avaliacaoId");

-- AddForeignKey
ALTER TABLE "mensagens" ADD CONSTRAINT "mensagens_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "turmas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
