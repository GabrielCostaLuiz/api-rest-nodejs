# Configuração de Projeto Node.js com TypeScript, Fastify, SQLite, Knex, ESLint e Testes

## Passo a Passo

### Inicialização do Projeto

1. Inicialize um novo projeto Node.js:

   ```bash
   npm init -y
   ```

2. Crie um arquivo com os requisitos do projeto:

   **Requisitos Funcionais (RF):**

   -

   **Regras de Negócio (RN):**

   -

   **Requisitos Não Funcionais (RNF):**

   -

3. Instale as dependências de desenvolvimento:

   ```bash
   npm i -D typescript @types/node tsx eslint @rocketseat/eslint-config vitest supertest @types/supertest tsup
   ```

4. Crie o arquivo de configuração do TypeScript:

   ```bash
   npx tsc --init
   ```

5. Atualize o `tsconfig.json`:

   - Altere a propriedade `target` para a versão mais atual do ECMAScript:
     ```json
     "target": "ES2022"
     ```

6. Configure o ESLint:

   - Crie o arquivo `.eslintrc.json` com o seguinte conteúdo:
     ```json
     {
       "extends": ["@rocketseat/eslint-config/node"]
     }
     ```

7. Teste a conversão de um arquivo TypeScript para JavaScript:

   ```bash
   npx tsc src/server.ts
   node src/server.js
   ```

### Instalação de Dependências para o Backend

1. Instale as dependências necessárias para o backend:

   ```bash
   npm i fastify knex sqlite3 dotenv zod @fastify/cookie
   ```

2. **Por que usar SQLite?**

   - O SQLite é ideal para desenvolvimento porque:
     - Não requer a configuração de um banco de dados local ou o uso de Docker.
     - Os dados são armazenados em arquivos físicos diretamente na aplicação.
     - Simples de configurar e usar.

### Usando o Knex como Query Builder

1. O Knex é um query builder que combina JavaScript com SQL, tornando o gerenciamento de consultas mais eficiente.

2. Configure o Knex para funcionar com TypeScript:

   - Crie o arquivo `src/database.ts` para configurar o banco de dados.
   - Crie o arquivo `knexfile.ts` para passar as configurações do Knex.
   - Adicione um script para o Knex interpretar TypeScript com `tsx`:
     ```bash
     npm run knex -- migrate:make create-documents
     ```

3. Para desfazer uma migration, use o comando:

   ```bash
   npm run knex -- migrate:rollback
   ```

### Configuração do Ambiente

1. Crie o arquivo `.env` para gerenciar variáveis de ambiente.
2. Valide e gerencie as variáveis usando o Zod:
   - Crie uma pasta chamada `env`.
   - Configure as validações dentro da pasta.

### Configuração de Rotas

1. Crie uma pasta chamada `routes` dentro de `src` para organizar as rotas da aplicação.

### Configuração de Tipos para o Knex

1. Caso precise adicionar tipos ao Knex, crie uma pasta `@types` na raiz do projeto.
2. Dentro dela, crie um arquivo `knex.d.ts` com as definições necessárias para o TypeScript.

### Testes

1. Utilize o Vitest para criar os testes unitários e de integração.
2. Use o Supertest para testar as rotas sem subir a aplicação.
3. Crie os arquivos de teste organizados dentro de `src/tests`.

---

## Estrutura Final do Projeto

```
├── src
│   ├── server.ts
│   ├── database.ts
│   ├── routes
│   │   └── example-route.ts
│   ├── env
│   │   └── zod-config.ts
│   └── tests
│       └── example.test.ts
├── .env
├── knexfile.ts
├── package.json
├── tsconfig.json
├── .eslintrc.json
└── ...
```

### Scripts Úteis

- **Criar Migration:**

  ```bash
  npm run knex -- migrate:make <migration_name>
  ```

- **Desfazer Migration:**

  ```bash
  npm run knex -- migrate:rollback
  ```

- **Executar Servidor:**

  ```bash
  npm run dev
  ```

- **Rodar Testes:**

  ```bash
  npm test
  ```

---

Com essas instruções, você terá um ambiente de desenvolvimento completo, eficiente e organizado para criar aplicações com Node.js, TypeScript, Fastify, SQLite, Knex, ESLint e testes automatizados.

