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
      // Schemas básicos
      ErrorResponse: {
        type: 'object',
        properties: {
          error: { type: 'string' }
        }
      },

      // Schemas de Usuário
      UsuarioCreate: {
        type: 'object',
        required: ['nome', 'email', 'senha', 'tipo'],
        properties: {
          nome: { type: 'string', example: 'Fulano da Silva' },
          email: { type: 'string', format: 'email', example: 'fulano@exemplo.com' },
          senha: { type: 'string', example: 'senha123' },
          tipo: { 
            type: 'string', 
            enum: ['ALUNO', 'PROFESSOR', 'ADMIN'],
            example: 'ALUNO'
          }
        }
      },
      

      // Schemas de Curso
      Curso: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          titulo: { type: 'string' },
          descricao: { type: 'string' },
          categoria: { 
            type: 'string',
            enum: ['INICIANTE', 'INTERMEDIARIO', 'AVANCADO']
          },
          cargaHoraria: { type: 'integer' }
        }
      },

      CursoCreate: {
        type: 'object',
        required: ['titulo', 'professorId'],
        properties: {
          titulo: { type: 'string', example: 'Introdução ao TypeScript' },
          descricao: { type: 'string', example: 'Curso introdutório' },
          categoria: { 
            type: 'string',
            enum: ['INICIANTE', 'INTERMEDIARIO', 'AVANCADO'],
            example: 'INICIANTE'
          },
          cargaHoraria: { type: 'integer', example: 40 },
          professorId: { type: 'string', format: 'uuid' }
        }
      },

      CursoUpdate: {
        type: 'object',
        properties: {
          titulo: { type: 'string', example: 'Introdução ao TypeScript Atualizado' },
          descricao: { type: 'string', example: 'Descrição atualizada' },
          categoria: { 
            type: 'string',
            enum: ['INICIANTE', 'INTERMEDIARIO', 'AVANCADO']
          },
          cargaHoraria: { type: 'integer' }
        }
      },

      CursoDetalhado: {
        allOf: [
          { $ref: '#/components/schemas/Curso' },
          {
            type: 'object',
            properties: {
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
                    ordem: { type: 'integer' }
                  }
                }
              }
            }
          }
        ]
      },

      components: {
        schemas: {
          Video: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              titulo: { type: 'string' },
              urlVideo: { type: 'string', format: 'uri' },
              duracao: { type: 'integer' },
              moduloId: { type: 'string', format: 'uuid' },
              createdAt: { type: 'string', format: 'date-time' }
            }
          }
        }
      },

      Avaliacao: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          titulo: { type: 'string' },
          descricao: { type: 'string' },
          notaMinima: { type: 'number' }
        }
      },

      // Schema de Turma
      TurmaCreate: {
        type: 'object',
        required: ['nome', 'cursoId', 'professorId', 'dataInicio', 'dataFim'],
        properties: {
          nome: { 
            type: 'string',
            example: 'Turma de TypeScript Avançado',
            minLength: 3
          },
          cursoId: { 
            type: 'string', 
            format: 'uuid',
            example: '123e4567-e89b-12d3-a456-426614174000'
          },
          professorId: { 
            type: 'string', 
            format: 'uuid',
            example: '123e4567-e89b-12d3-a456-426614174000' 
          },
          dataInicio: { 
            type: 'string',
            format: 'date-time',
            example: '2024-01-01T00:00:00Z'
          },
          dataFim: { 
            type: 'string',
            format: 'date-time',
            example: '2024-12-31T00:00:00Z'
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