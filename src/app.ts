// src/app.ts
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import usuarioRoutes from './routes/usuarioRoutes';
import cursoRoutes from './routes/course.routes';
import authRoutes from './routes/auth.routes';
import swaggerSpec from './config/swagger';
import prisma from './config/database';

const app = express();

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
  res.status(200).json({ status: 'UP' });
});

// Rotas principais
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/auth', authRoutes);

export { app };
