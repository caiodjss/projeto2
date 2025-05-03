import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Plataforma EAD',
    version: '1.0.0',
    description: 'Documentação completa da API',
  },
  servers: [
    { 
      url: 'http://localhost:3000/api',
      description: 'Development server' 
    }
  ],
  tags: [
    {
      name: 'Autenticação',
      description: 'Endpoints de autenticação de usuários'
    },
    {
      name: 'Cursos',
      description: 'Gerenciamento de cursos'
    },
    {
      name: 'Usuários',
      description: 'Gerenciamento de usuários'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    },
    schemas: {
      UsuarioLogin: {
        type: 'object',
        required: ['email', 'senha'],
        properties: {
          email: { 
            type: 'string', 
            format: 'email',
            example: 'usuario@exemplo.com'
          },
          senha: { 
            type: 'string',
            minLength: 6,
            example: 'senha123'
          }
        }
      },
      UsuarioCreate: {
        type: 'object',
        required: ['nome', 'email', 'senha', 'tipo'],
        properties: {
          nome: { 
            type: 'string', 
            minLength: 3,
            example: 'Fulano da Silva'
          },
          email: { 
            type: 'string', 
            format: 'email',
            example: 'fulano@exemplo.com'
          },
          senha: { 
            type: 'string',
            minLength: 6,
            example: 'senha123'
          },
          tipo: { 
            type: 'string', 
            enum: ['ADMIN', 'PROFESSOR', 'ALUNO'],
            example: 'ALUNO'
          },
          planoId: { 
            type: 'string',
            nullable: true,
            example: '123e4567-e89b-12d3-a456-426614174000'
          }
        }
      },
      CursoCreate: {
        type: 'object',
        required: ['titulo', 'professorId'],
        properties: {
          titulo: { 
            type: 'string',
            example: 'Introdução ao TypeScript'
          },
          descricao: { 
            type: 'string',
            nullable: true,
            example: 'Curso introdutório de TypeScript'
          },
          categoria: { 
            type: 'string',
            enum: ['INICIANTE', 'INTERMEDIARIO', 'AVANCADO'],
            example: 'INICIANTE'
          },
          cargaHoraria: { 
            type: 'number',
            nullable: true,
            example: 40
          },
          professorId: { 
            type: 'string',
            example: '123e4567-e89b-12d3-a456-426614174000'
          }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            example: 'Mensagem de erro detalhada'
          }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: [
    './src/routes/*.ts',
    './src/controllers/*.ts',
    './src/dto/*.ts'
  ],
};

export default require('swagger-jsdoc')(options);