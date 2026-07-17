import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { taskController } from "./task.controller";
import { TaskCreateSchema, TaskUpdateSchema } from "./task.schema";

export async function TaskRoutes(app: FastifyInstance) {
    const server = app.withTypeProvider<ZodTypeProvider>()

    server.post('/task', {
        schema: { tags: ['Task'], body: TaskCreateSchema },
    }, (request, reply) => taskController.createTask(request, reply))

    server.get('/task/:id', {
        schema: { tags: ['Task'], params: z.object({ id: z.string() }) },
    }, (request, reply) => taskController.getTaskByID(request, reply))

    server.put('/task/:id', {
        schema: {
            tags: ['Task'],
            params: z.object({ id: z.string() }),
            body: TaskUpdateSchema,
        },
    }, (request, reply) => taskController.updateTask(request, reply))

    server.delete('/task/:id', {
        schema: { tags: ['Task'], params: z.object({ id: z.string() }) },
    }, (request, reply) => taskController.deleteTask(request, reply))
}
