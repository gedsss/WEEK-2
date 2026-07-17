import type { FastifyInstance } from "fastify";
import { taskController } from "./task.controller";

export async function TaskRoutes(app: FastifyInstance){
    app.post('/task', (request, reply) => {
        return taskController.createTask(request, reply)
    })

    app.get('/task/:id', (request, reply) => {
        return taskController.getTaskByID(request, reply)
    })

    app.put('/task/:id', (request, reply) => {
        return taskController.updateTask(request, reply)
    })

    app.delete('/task/:id', (request, reply) => {
        return taskController.deleteTask(request, reply)
    })
}
