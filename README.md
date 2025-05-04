# Plataforma EAD - Universidade Senai Cimatec

## Curso: Análise e Desenvolvimento de Sistemas  
**Professor:** Celso Barreto  
**Integrante:** Caio de Jesus  

## Descrição do Projeto

A plataforma EAD foi desenvolvida para ministrar cursos online nas áreas de **negócios, empreendedorismo e tecnologia**, com foco em desenvolvimento de jogos e produtos de software. A solução permite que alunos, professores e administradores tenham uma experiência interativa e eficaz.

### Funcionalidades principais:
- **Módulos de Cursos:** Vídeos, apostilas, roteiros de prática e avaliações de aprendizagem.
- **Planos para Alunos:** Diversos planos de assinatura (Básico, Empreendedor, Startup) com benefícios como mentorias, participação em eventos e até parceria estratégica para startups.
- **Ambiente de Acompanhamento:** Registro de progresso dos alunos, com indicadores como porcentagem concluída e histórico de visualização de vídeos.
- **Gestão de Turmas:** Professores podem gerenciar suas turmas e interagir com os alunos.

### Estrutura Organizacional:
- **Aluno:** Acesso a conteúdos específicos, monitoramento de progresso e interação com professores.
- **Professor:** Gerenciamento de turmas e conteúdo, com interação direta com os alunos.
- **Administrador:** Acesso completo para gestão de todos os aspectos da plataforma, incluindo cursos, módulos e usuários.

## Tecnologias Utilizadas

- **Frontend:** React
- **Backend:** Node.js, TypeScript, Express, Prisma, PostgreSQL
- **Autenticação:** JWT (JSON Web Tokens)
- **Hospedagem:** Vercel (em breve)
- **Banco de Dados:** PostgreSQL

## Planos de Assinatura

1. **Plano Básico:**
   - Acesso aos módulos de cursos com apostilas, vídeos e avaliações.
   - Participação em grupos fechados no WhatsApp para networking.

2. **Plano Empreendedor:**
   - Todos os benefícios do Plano Básico, mais mentorias online e acesso a eventos exclusivos.

3. **Plano Startup:**
   - Todos os benefícios do Plano Empreendedor, mais apoio em modelagem de negócios, incubação e aceleração.

## Funcionalidades Avançadas
- **Monitoramento de Aprendizado:** Rastreio detalhado de vídeos assistidos e materiais baixados.
- **Comunicação:** Caixa de entrada para mensagens e notificações do professor.
- **Análises e Recomendações:** Relatórios de desempenho e recomendações de aprendizado com base em IA.
- **Gamificação:** Sistema de badges e certificados digitais.

## Como Testar a API (Backend)
A API foi implementada com os seguintes endpoints principais:
- **POST /api/modulo** - Criar módulo
- **GET /api/modulo/:cursoId** - Listar módulos de um curso
- **PUT /api/modulo/:id** - Atualizar módulo
- **DELETE /api/modulo/:id** - Excluir módulo
- **POST /api/modulo/reordenar** - Reordenar módulos

A documentação completa dos endpoints será fornecida após a conclusão da plataforma, com os testes realizados no backend.

## Plano de Desenvolvimento

- **Fase 1:** Conclusão do Backend (em andamento)
- **Fase 2:** Testes e validação dos endpoints
- **Fase 3:** Desenvolvimento do Frontend em React
- **Fase 4:** Integração entre o Frontend e Backend
- **Fase 5:** Lançamento e divulgação da plataforma

## Contato

Caso tenha dúvidas ou sugestões, entre em contato com o desenvolvedor:

- **E-mail:** cdj@outlook.com.br
