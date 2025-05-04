import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Plataforma EAD',
    version: '1.0.0',
    description: 'Documentação da API',
  },
  servers: [{ url: 'http://localhost:3000/api' }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      // Schemas existentes que você já tinha
      UsuarioCreate: {
        type: 'object',
        required: ['nome', 'email', 'senha', 'tipo'],
        properties: {
          nome: { type: 'string', example: 'Fulano da Silva' },
          email: { type: 'string', format: 'email', example: 'fulano@exemplo.com' },
          senha: { type: 'string', example: 'senha123' },
          tipo: { type: 'string', enum: ['ADMIN', 'PROFESSOR', 'ALUNO'] }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          error: { type: 'string' }
        }
      },
      
      // NOVOS SCHEMAS PARA RESOLVER OS ERROS
      Curso: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid', example: 'c3558630-3d8d-48e1-a11a-e62a6899ba9d' },
          titulo: { type: 'string', example: 'Introdução ao TypeScript' },
          descricao: { type: 'string', example: 'Curso introdutório de TypeScript' },
          categoria: { type: 'string', enum: ['INICIANTE', 'INTERMEDIARIO', 'AVANCADO'] },
          cargaHoraria: { type: 'number', example: 40 }
        }
      },
      
      CursoCreate: {
        type: 'object',
        required: ['titulo', 'professorId'],
        properties: {
          titulo: { type: 'string', example: 'Introdução ao TypeScript' },
          descricao: { type: 'string', nullable: true, example: 'Curso introdutório de TypeScript' },
          categoria: { type: 'string', enum: ['INICIANTE', 'INTERMEDIARIO', 'AVANCADO'], example: 'INICIANTE' },
          cargaHoraria: { type: 'number', nullable: true, example: 40 },
          professorId: { type: 'string', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174000' }
        }
      },
      
      CursoUpdate: {
        type: 'object',
        properties: {
          titulo: { type: 'string', example: 'Introdução ao TypeScript Atualizado' },
          descricao: { type: 'string', nullable: true, example: 'Curso introdutório de TypeScript - versão atualizada' },
          categoria: { type: 'string', enum: ['INICIANTE', 'INTERMEDIARIO', 'AVANCADO'] },
          cargaHoraria: { type: 'number', nullable: true }
        }
      },
      
      CursoDetalhado: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          titulo: { type: 'string' },
          descricao: { type: 'string' },
          categoria: { type: 'string' },
          cargaHoraria: { type: 'number' },
          professor: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              nome: { type: 'string' },
              email: { type: 'string', format: 'email' }
            }
          },
          modulos: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', format: 'uuid' },
                titulo: { type: 'string' },
                ordem: { type: 'number' }
              }
            }
          }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'],
};

export default require('swagger-jsdoc')(options);