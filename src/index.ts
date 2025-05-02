// src/index.ts
import 'dotenv/config';
import { app } from './app';
import prisma from './config/database'; // Import do prisma diretamente

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


// Fechar conexões adequadamente
process.on('SIGTERM', async () => {
  await prisma.$disconnect(); // Usando prisma diretamente
  server.close(() => {
    console.log('Servidor encerrado');
  });
});