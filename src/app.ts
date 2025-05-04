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
import videoRoutes from './routes/video.routes'
import mensagemRoutes from './routes/mensagem.routes';
import { env } from './config/env';

const app = express();

app.use('/api', moduloRoutes);
app.use('/api', videoRoutes);
app.use('/api/mensagens', mensagemRoutes);

// Usando o middleware CORS
app.use(cors());

// Usando o middleware para processar corpo JSON
app.use(express.json());

// Definindo a documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas básicas
app.get('/', (req, res) => {
  res.json({ message: 'API da Plataforma EAD' });
});

// Endpoint de health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP', environment: env.NODE_ENV });
});

// Rotas principais
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/turmas', turmaRoutes);
app.use('/api/planos', planoRoutes);

// Conectar ao Prisma na inicialização da aplicação (opcional, pode ser feito no server.ts)
prisma.$connect()
  .then(() => console.log('Conectado ao banco de dados'))
  .catch((e) => console.error('Erro ao conectar ao banco de dados:', e));

export { app };