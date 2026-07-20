# BookStore Manager CLI

Aplicação de linha de comando (CLI) para gerenciamento de uma livraria, desenvolvida como Projeto Final Avaliativo do Módulo 01. Permite administrar autores, livros, clientes e empréstimos, utilizando Node.js, TypeScript e PostgreSQL.

## Objetivo

Consolidar os conhecimentos de back-end desenvolvidos ao longo do módulo: JavaScript moderno, TypeScript, Programação Orientada a Objetos, programação assíncrona, arquitetura em camadas, modelagem de banco de dados relacional e boas práticas de desenvolvimento (Clean Code / SOLID).

## Tecnologias utilizadas

- Node.js
- TypeScript
- PostgreSQL
- Biblioteca `pg` (driver PostgreSQL para Node.js)
- `dotenv` (variáveis de ambiente)
- `ts-node-dev` (execução em modo desenvolvimento)

## Requisitos para execução

- Node.js 18+ instalado
- PostgreSQL instalado e em execução
- npm

## Configuração do banco de dados

1. Crie o banco de dados no PostgreSQL:

   ```sql
   CREATE DATABASE bookstore_manager;
   ```

2. Execute o script de criação das tabelas (`src/database/schema.sql`) conectado ao banco criado:

   ```bash
   psql -U <seu_usuario> -d bookstore_manager -f src/database/schema.sql
   ```

   Esse script cria as tabelas `autores`, `livros`, `clientes` e `emprestimos`, com seus relacionamentos (chaves primárias e estrangeiras), além de inserir alguns dados de exemplo.

## Instalação

1. Clone o repositório:

   ```bash
   git clone <link-do-repositorio>
   cd bookstore-manager-cli
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Copie o arquivo de variáveis de ambiente de exemplo e ajuste com suas credenciais:

   ```bash
   cp .env.example .env
   ```

   Edite o `.env`:

   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=sua_senha
   DB_NAME=bookstore_manager
   ```

## Execução

Modo desenvolvimento (recomendado, com recarregamento automático):

```bash
npm run dev
```

Modo produção (compilar e depois executar):

```bash
npm run build
npm start
```

## Arquitetura do projeto

A aplicação segue uma arquitetura organizada em camadas, separando responsabilidades:

```
src/
├── main.ts                # Ponto de entrada da aplicação
├── controllers/           # Interação com o usuário via terminal
├── services/               # Regras de negócio
├── repositories/           # Comunicação exclusiva com o PostgreSQL
├── models/                 # Classes e interfaces das entidades
├── database/                # Conexão com o banco e script SQL
├── utils/                   # Funções auxiliares (validações, inputs, erros)
└── menus/                    # Organização e navegação dos menus da CLI
```

Fluxo de uma funcionalidade:

```
Usuário -> Menu -> Controller -> Service -> Repository -> PostgreSQL
```

- Controllers: exibem menus, capturam entradas do usuário e chamam os serviços.
- Services: aplicam as regras de negócio e validações (ex.: impedir empréstimo de livro indisponível).
- Repositories: executam os comandos SQL (INSERT, UPDATE, DELETE, SELECT) via biblioteca `pg`.
- Models: representam Autor, Livro, Cliente e Empréstimo como classes/interfaces tipadas.

## Funcionalidades implementadas

- Gerenciamento de autores: cadastrar, listar, consultar por id, atualizar, remover.
- Gerenciamento de livros: cadastrar (vinculado a um autor), listar, consultar por id, atualizar, remover.
- Gerenciamento de clientes: cadastrar, listar, consultar por id, atualizar, remover.
- Gerenciamento de empréstimos:
  - Realizar empréstimo (valida existência do livro, do cliente e disponibilidade de exemplares).
  - Registrar devolução (atualiza a quantidade disponível do livro).
  - Consultar empréstimos (com nome do livro, do cliente e datas).
- Relatórios gerenciais (utilizando JOIN, GROUP BY, ORDER BY, LIMIT e funções de agregação):
  - Livros disponíveis.
  - Livros emprestados.
  - Livros cadastrados por autor.
  - Quantidade de empréstimos por livro.
  - Clientes com empréstimos ativos.
- Tratamento de erros de negócio (livro/autor/cliente inexistente, livro sem disponibilidade, e-mail duplicado, etc.) sem interromper a execução da aplicação.
- Uso de async/await e try/catch em todas as operações de banco de dados.

## Estrutura de pastas

```
bookstore-manager-cli/
├── src/
│   ├── controllers/
│   │   ├── AutorController.ts
│   │   ├── LivroController.ts
│   │   ├── ClienteController.ts
│   │   ├── EmprestimoController.ts
│   │   └── RelatorioController.ts
│   ├── services/
│   │   ├── AutorService.ts
│   │   ├── LivroService.ts
│   │   ├── ClienteService.ts
│   │   ├── EmprestimoService.ts
│   │   └── RelatorioService.ts
│   ├── repositories/
│   │   ├── AutorRepository.ts
│   │   ├── LivroRepository.ts
│   │   ├── ClienteRepository.ts
│   │   └── EmprestimoRepository.ts
│   ├── models/
│   │   ├── Autor.ts
│   │   ├── Livro.ts
│   │   ├── Cliente.ts
│   │   └── Emprestimo.ts
│   ├── database/
│   │   ├── connection.ts
│   │   └── schema.sql
│   ├── utils/
│   │   ├── InputHelper.ts
│   │   ├── Validators.ts
│   │   └── AppError.ts
│   ├── menus/
│   │   └── MainMenu.ts
│   └── main.ts
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
└── README.md
```

## Exemplo de utilização

```
============================================
          BOOKSTORE MANAGER CLI
============================================
1 - Autores
2 - Livros
3 - Clientes
4 - Empréstimos
5 - Relatórios
0 - Encerrar aplicação

Escolha uma opção: 4

--- Menu Empréstimos ---
1 - Realizar empréstimo
2 - Registrar devolução
3 - Listar empréstimos
0 - Voltar

Escolha uma opção: 1
Id do livro: 1
Id do cliente: 1
Empréstimo registrado com sucesso! (id: 1)
```

## Integrantes da equipe

- [Nome do(a) integrante 1]
- [Nome do(a) integrante 2] (se houver)
- [Nome do(a) integrante 3] (se houver)

## Link do Kanban

[Inserir aqui o link do quadro Kanban utilizado pela equipe]
