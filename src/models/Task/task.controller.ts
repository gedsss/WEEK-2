import type { FastifyRequest, FastifyReply } from 'fastify'
import { taskService } from './task.service'
import { TaskCreateSchema, TaskUpdateSchema } from './task.schema'

class TaskController {
    async createTask(request: FastifyRequest, reply: FastifyReply) {
        const data = TaskCreateSchema.parse(request.body)

        const task = await taskService.createTask(data)

        return reply.status(201).send({
            message: 'Success',
            success: true,
            data: task
        })
    }

    async getTaskByID(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string }

        const task = await taskService.getTaskByID(id)

        return reply.status(200).send({
            message: 'Success',
            success: true,
            data: task
        })
    }

    async updateTask(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string }
        const data = TaskUpdateSchema.parse(request.body)

        const task = await taskService.updateTask(id, data)

        return reply.status(200).send({
            message: 'Success',
            success: true,
            data: task
        })
    }

    async deleteTask(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as {id: string}

        await taskService.deleteTask(id)

        return reply.status(200).send({
            message: 'Success',
            success: true,
        })
    }
}

export const taskController = new TaskController()
