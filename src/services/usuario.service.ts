import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const listarUsuarios = async () => {
  return prisma.usuario.findMany()
}
