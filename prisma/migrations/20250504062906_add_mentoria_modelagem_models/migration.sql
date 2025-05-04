/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `planos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "TipoBeneficio" AS ENUM ('ACESSO_MODULOS', 'GRUPO_WHATSAPP', 'MENTORIAS', 'EVENTOS', 'MODELAGEM_NEGOCIOS', 'INCUBACAO', 'CONTRATO_DIGITAL');

-- CreateTable
CREATE TABLE "beneficios_plano" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo" "TipoBeneficio" NOT NULL,
    "planoId" TEXT NOT NULL,
    "config" JSONB,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "beneficios_plano_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mentorias" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "tema" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'AGENDADA',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mentorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelagem_negocios" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "dados" JSONB NOT NULL,
    "etapa" TEXT NOT NULL DEFAULT 'INICIAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "modelagem_negocios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "planos_nome_key" ON "planos"("nome");

-- AddForeignKey
ALTER TABLE "beneficios_plano" ADD CONSTRAINT "beneficios_plano_planoId_fkey" FOREIGN KEY ("planoId") REFERENCES "planos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentorias" ADD CONSTRAINT "mentorias_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modelagem_negocios" ADD CONSTRAINT "modelagem_negocios_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
