# EAD Platform - Backend Projeto

## Descrição Geral

Este projeto se refere ao backend de uma plataforma EAD, que visa proporcionar cursos online nas áreas de negócios, empreendedorismo e tecnologia, com funcionalidades específicas para alunos, professores e administradores. A plataforma oferece diferentes planos de assinatura, e os alunos podem acompanhar seu progresso nos cursos.

## Estrutura do Projeto

```
- prisma
- src
    - config
        - auth.ts
        - database.ts
        - env.ts
        - swagger.ts
    - controllers
        - auth.controller.ts
        - course.controller.ts
        - usuario.controller.ts
    - dto
        - user.dto.ts
    - middlewares
        - auth.middleware.ts
        - validate.ts
    - routes
        - auth.routes.ts
        - course.routes.ts
        - usuarioRoutes.ts
    - services
        - plano.service.ts
        - progress.service.ts
        - usuario.service.ts
    - types
        - express.d.ts
        - prisma.d.ts
        - user.ts
    - utils
        - asyncHandler.ts
    - app.ts
    - index.ts
    - prisma-types.ts
- .env
- .gitignore
- package-lock.json
- package.json
- tsconfig.json
```

## O que está pronto

### 1. **Configuração**

* **auth.ts**: Configuração de autenticação, possivelmente com JWT.
* **database.ts**: Configuração do Prisma para conectar ao banco de dados.
* **env.ts**: Arquivo de variáveis de ambiente (como dados do banco de dados e chave JWT).
* **swagger.ts**: Configuração para gerar documentação da API.

### 2. **Controllers**

* **auth.controller.ts**: Lógica de autenticação, como login e registro.
* **course.controller.ts**: Lógica para gerenciar cursos.
* **usuario.controller.ts**: Lógica para gerenciar usuários (alunos e professores).

### 3. **DTO (Data Transfer Object)**

* **user.dto.ts**: Estrutura de dados para os usuários, provavelmente usada em requisições.

### 4. **Middlewares**

* **auth.middleware.ts**: Middleware para verificar autenticação do usuário.
* **validate.ts**: Middleware de validação de dados nas requisições.

### 5. **Routes**

* **auth.routes.ts**: Rotas de autenticação (login, registro).
* **course.routes.ts**: Rotas para gerenciar cursos.
* **usuarioRoutes.ts**: Rotas para gerenciar usuários.

### 6. **Services**

* **plano.service.ts**: Lógica de serviços relacionada aos planos de assinatura.
* **progress.service.ts**: Lógica para rastrear e calcular o progresso dos alunos.
* **usuario.service.ts**: Lógica de serviços para gerenciar usuários (criação, atualização, exclusão).

### 7. **Types**

* **express.d.ts**: Definições para o Express.
* **prisma.d.ts**: Tipos do Prisma.
* **user.ts**: Tipos relacionados ao modelo de usuário.

### 8. **Utils**

* **asyncHandler.ts**: Função utilitária para tratamento de erros assíncronos.

### 9. **Arquivos principais**

* **app.ts**: Arquivo de configuração do servidor.
* **index.ts**: Arquivo principal de inicialização do servidor.
* **prisma-types.ts**: Tipos relacionados ao Prisma.

## O que falta ser feito

### 1. **Gestão de Planos e Benefícios**

* Criar a lógica para **controle de planos de assinatura** (Básico, Empreendedor, Startup), com benefícios específicos e gestão de acesso aos conteúdos.
* Implementar a **integração com o sistema de pagamento**, caso os planos sejam pagos.

### 2. **Acompanhamento de Progresso dos Alunos**

* Criar a funcionalidade para **registrar o progresso do aluno**, como vídeos assistidos e apostilas baixadas.
* Implementar **relatórios de progresso** (percentual de conclusão dos cursos, tempo assistido, etc).
* Adicionar **notificações** para alertar os alunos sobre novos vídeos, apostilas ou mensagens.

### 3. **Funções de Professor**

* Implementar funcionalidades para os professores:

  * **Gerenciamento de turmas** (atribuição de alunos, visualização de progresso).
  * **Interação com alunos** (feedbacks, mensagens diretas).

### 4. **Funções de Administrador**

* Desenvolver um painel para o **administrador** que permita:

  * **Criação, edição e exclusão de cursos, módulos, e usuários**.
  * **Visualização de relatórios** sobre o desempenho da plataforma.

### 5. **Sistema de Mensagens e Notificações**

* Criar um **sistema de mensagens** entre alunos e professores.
* Desenvolver uma **caixa de entrada inteligente** para notificações e alertas.

### 6. **Gamificação e Recompensas**

* Implementar **sistemas de gamificação**, como badges, rankings e certificações digitais para os alunos.

### 7. **Modelo de Negócios para o Plano Startup**

* Criar lógica para a **incubação e aceleração** de startups no plano "Startup", incluindo:

  * Acompanhamento de **modelagem de negócios**.
  * **Parceria com a plataforma** e contratos de 25% de participação.

### 8. **Testes e Validação**

* Realizar **testes de integração e unitários** para garantir que todos os fluxos (como login, progressão, envio de mensagens) estejam funcionando corretamente.

### 9. **Melhorias e Escalabilidade**

* **Escalabilidade da plataforma**: Garantir que o backend consiga lidar com uma grande quantidade de usuários e dados.
* **Backup e segurança**: Implementar backup e garantir segurança nas interações da plataforma.

## Tecnologias Utilizadas

* **Prisma**: ORM para gerenciamento do banco de dados.
* **Node.js**: Ambiente de execução para o backend.
* **Express.js**: Framework para desenvolvimento de APIs RESTful.
* **TypeScript**: Para garantir maior segurança de tipos e escalabilidade do código.
* **JWT**: Para autenticação e autorização dos usuários.

## Conclusão

O backend está **em fase de desenvolvimento** e já possui várias funcionalidades implementadas, como autenticação de usuários, gestão de cursos e estrutura básica de comunicação entre frontend e backend. No entanto, ainda faltam funcionalidades avançadas como o controle de planos, acompanhamento de progresso dos alunos, e sistemas de gamificação. O projeto está no caminho certo, mas precisa de algumas implementações para atender completamente aos requisitos do sistema.
