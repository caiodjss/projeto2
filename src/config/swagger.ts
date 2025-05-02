import swaggerJsdoc from 'swagger-jsdoc';
import { version } from '../../package.json';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Plataforma EAD API',
      version,
      description: 'Documentação da API da plataforma EAD do Senai Cimatec',
      contact: {
        name: 'Equipe de Desenvolvimento',
        email: 'equipe@eadsenai.com'
      },
      license: {
        name: 'MIT',
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de Desenvolvimento'
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Usuario: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            nome: { type: 'string' },
            email: { type: 'string', format: 'email' },
            tipo: { type: 'string', enum: ['ALUNO', 'PROFESSOR', 'ADMIN'] }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            message: { type: 'string' }
          }
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./src/routes/*.ts', './src/dto/*.ts', './src/models/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

// Adicione isso no seu swagger.ts ou em arquivos separados

/**
 * @swagger
 * components:
 *   schemas:
 *     Curso:
 *       type: object
 *       required:
 *         - titulo
 *         - cargaHoraria
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         titulo:
 *           type: string
 *         descricao:
 *           type: string
 *         cargaHoraria:
 *           type: integer
 *         modulos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Modulo'
 * 
 *     Modulo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         titulo:
 *           type: string
 *         ordem:
 *           type: integer
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Plano:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         nome:
 *           type: string
 *           enum: [BASICO, EMPREENDEDOR, STARTUP]
 *         descricao:
 *           type: string
 * 
 *     ProgressoAluno:
 *       type: object
 *       properties:
 *         alunoId:
 *           type: string
 *         cursoId:
 *           type: string
 *         videosAssistidos:
 *           type: array
 *           items:
 *             type: string
 *         porcentagemConclusao:
 *           type: number
 */
/**
 * @swagger
 * /api/cursos:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags: [Cursos]
 *     description: Rota protegida para admin/professor
 */