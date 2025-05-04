import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import authRoutes from './routes/auth.routes';
import courseRoutes from './routes/course.routes';
import turmaRoutes from './routes/turma.routes';
import usuarioRoutes from './routes/usuarioRoutes';

const app = express();

// Middlewares essenciais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use('/api-docs', 
  swaggerUi.serve, 
  swaggerUi.setup(swaggerSpec)
);

// Registre suas rotas
app.use('/api/auth', authRoutes);
app.use('/api/cursos', courseRoutes);
app.use('/api/turmas', turmaRoutes);
app.use('/api/usuarios', usuarioRoutes);

// Rota de health check (opcional)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// Inicie o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
});