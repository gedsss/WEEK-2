# Task API

A simple CRUD API for managing tasks (`Task`), built with Fastify, Prisma and Zod.

## Stack

- [Fastify](https://fastify.dev/) — HTTP server
- [Prisma](https://www.prisma.io/) (with `@prisma/adapter-pg`) — ORM on top of PostgreSQL
- [Zod](https://zod.dev/) — schema validation
- [Swagger / OpenAPI](https://swagger.io/) — interactive API documentation
- [tsx](https://github.com/privatenumber/tsx) — run TypeScript without a build step

## Requirements

- Node.js 20+
- A reachable PostgreSQL database

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with the database connection string:
   ```
   DATABASE_URL="postgresql://user:password@host:port/database_name"
   ```

3. Generate the Prisma client from `prisma/schema.prisma`:
   ```bash
   npx prisma generate
   ```

4. Apply the schema to the database:
   ```bash
   npx prisma migrate dev
   ```

## Running the project

```bash
npx tsx index.ts
```

The server starts at `http://localhost:3333`.

## API documentation (Swagger)

With the server running, the interactive documentation is available at:

```
http://localhost:3333/docs
```

There you can see all the fields expected by each route and try them out directly from the browser ("Try it out"). The raw OpenAPI JSON (in case you need to import it into another tool, like Postman/Insomnia) is available at `http://localhost:3333/docs/json`.

## Routes

| Method | Route        | Description        |
|--------|--------------|---------------------|
| POST   | `/task`      | Creates a task      |
| GET    | `/task/:id`  | Fetches a task by id |
| PUT    | `/task/:id`  | Updates a task      |
| DELETE | `/task/:id`  | Deletes a task      |

### `Task` model

| Field         | Type                          | Notes                      |
|---------------|--------------------------------|------------------------------|
| `id`          | `string` (uuid)                | auto-generated               |
| `title`       | `string` (up to 30 characters) | required on creation         |
| `description` | `string` (up to 40 characters) | required on creation         |
| `status`      | `"active"` \| `"inactive"`     | required on creation         |
| `priority`    | `string` (up to 50 characters) | required on creation         |
| `created_at`  | `datetime`                     | auto-generated               |

## Project structure

```
index.ts                     # entrypoint: registers plugins/routes, starts the server
prisma/
  schema.prisma               # Task model definition
  prismaClient.ts              # PrismaClient instance (via adapter-pg)
src/models/Task/
  task.schema.ts               # Zod schemas (create/update)
  task.service.ts               # business logic and database access via Prisma
  task.controller.ts             # HTTP handlers (request/response)
  task.routes.ts                  # route definitions and schemas used by Swagger
```
