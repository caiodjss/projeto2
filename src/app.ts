import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import usuarioRoutes from './routes/usuarioRoutes';
import cursoRoutes from './routes/course.routes';
import planoRoutes from './routes/plano.routes';
import authRoutes from './routes/auth.routes';
import turmaRoutes from './routes/turma.routes'; 
import swaggerSpec from './config/swagger'; 
import moduloRoutes from './routes/modulo.routes';
import prisma from './config/database';
import videoRoutes from './routes/video.routes';
import mensagemRoutes from './routes/mensagem.routes';
import { env } from './config/env';
import { errorHandler } from './middlewares/errorHandler'; // Adicione este middleware

const app = express();

// 1. Middlewares essenciais (DEVEM vir primeiro)
app.use(cors({
  origin: env.CORS_ORIGINS.split(','), // Ex: 'http://localhost:3000,http://localhost:5500'
  credentials: true
}));
app.use(express.json());

// 2. Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 3. Rotas de status/health
app.get('/', (req, res) => {
  res.json({ 
    message: 'API da Plataforma EAD',
    environment: env.NODE_ENV,
    version: env.APP_VERSION
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'UP', 
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// 4. Rotas da API (organizadas por contexto)
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/cursos/:cursoId/modulos', moduloRoutes); // Aninhadas sob cursos
app.use('/api/modulos/:moduloId/videos', videoRoutes); // Aninhadas sob módulos
app.use('/api/turmas', turmaRoutes);
app.use('/api/planos', planoRoutes);
app.use('/api/mensagens', mensagemRoutes);

// 5. Conexão com Prisma (melhor mover para server.ts)
prisma.$connect()
  .then(() => console.log('✅ Conectado ao banco de dados'))
  .catch((e) => {
    console.error('❌ Erro ao conectar ao banco de dados:', e);
    process.exit(1);
  });

// 6. Middleware de erro global (DEVE ser o último)
app.use(errorHandler);

export { app };