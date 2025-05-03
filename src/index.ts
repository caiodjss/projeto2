import 'dotenv/config';
import swaggerUi from 'swagger-ui-express'; // Adicione esta importação
import { app } from './app';
import prisma from './config/database';
import swaggerSpec from './config/swagger';

const PORT = process.env.PORT || 3000;

// Configure o Swagger antes de iniciar o servidor
app.use('/api-docs', 
  swaggerUi.serve, 
  swaggerUi.setup(swaggerSpec)
);

const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
});

// Fechar conexões adequadamente
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  server.close(() => {
    console.log('Servidor encerrado');
  });
});