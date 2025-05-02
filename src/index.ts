import 'dotenv/config';
import { app, prisma } from './app';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Fechar conexões adequadamente
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  server.close(() => {
    console.log('Servidor encerrado');
  });
});