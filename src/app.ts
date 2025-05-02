import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import usuarioRoutes from './routes/usuarioRoutes';
import cursoRoutes from './routes/course.routes';
import authRoutes from './routes/auth.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import { prisma } from './config/prisma';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.json({ message: 'API da Plataforma EAD' });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/auth', authRoutes); //

export { app, prisma };