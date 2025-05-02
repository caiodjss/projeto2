# 🎓 Plataforma de Cursos Acadêmicos

API para gerenciamento de cursos, professores e alunos com Prisma e TypeScript

## 📦 Tecnologias Utilizadas
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Swagger (documentação)

## 🚀 Como Executar

### Pré-requisitos
- Node.js 16+
- Banco de dados configurado (via `.env`)
- Prisma CLI instalado globalmente (`npm install -g prisma`)

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env

# 3. Executar migrações
npx prisma migrate dev

# 4. Iniciar servidor
npm run dev
📚 Rotas da API
Método	Rota	Descrição
GET	/cursos	Lista todos os cursos
GET	/cursos/:id	Busca um curso específico
POST	/cursos	Cria um novo curso
PUT	/cursos/:id	Atualiza um curso existente
DELETE	/cursos/:id	Remove um curso
🛠️ Estrutura do Projeto
src/
├── config/          # Configurações do app
├── controllers/     # Lógica das rotas
├── prisma/          # Schema e migrações
├── routes/          # Definição de rotas
└── types/           # Tipos customizados
📄 Documentação
Acesse a documentação Swagger em /api-docs após iniciar o servidor
