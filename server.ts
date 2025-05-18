import { createServer } from 'http';
import { env } from 'process';
import { Server } from 'socket.io';
import { app } from './src/app';

// Configuração segura das variáveis de ambiente
const PORT = env.PORT || '3000';
const CORS_ORIGINS = env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'];

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: CORS_ORIGINS
  }
});

io.on('connection', (socket) => {
  console.log('Novo cliente conectado');
  
  socket.on('joinCourse', (courseId: string) => {
    socket.join(`course_${courseId}`);
    console.log(`Cliente entrou no curso: ${courseId}`);
  });

  socket.on('sendMessage', (message: { courseId: string, content: string }) => {
    io.to(`course_${message.courseId}`).emit('newMessage', message);
    console.log(`Nova mensagem no curso ${message.courseId}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});