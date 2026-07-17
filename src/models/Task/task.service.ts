import  type { TaskCreateSchema, TaskUpdateSchema } from "./task.schema";
import { prisma } from "../../../prisma/prismaClient";

class TaskService {
    async createTask(data: TaskCreateSchema){
        if(!data || Object.keys(data).length === 0){
            throw new Error("Task data is required");
        }

        if(!data.title || !data.description || !data.status || !data.priority) {
            throw new Error("Missing Data")
        }
        try {
        const task = await prisma.task.create({
            data: {
                title: data.title,
                description: data.description,
                status: data.status,
                priority: data.priority
            }
        })

        return task
        } catch (err: any) {
            throw new Error('Task creation failed', { cause: err })
        }
    }

    async getTaskByID(id: string) {
        const task = await prisma.task.findUnique({
            where: { id },
        })

        if(!task) {
            throw new Error('Task not found')
        }

        return task
    }

    async updateTask(id: string, data: TaskUpdateSchema) {
        const findTask = await prisma.task.findUnique({
            where: { id },
        })

        if(!findTask) {
            throw new Error('Task not found')
        }
        try {
        const task = await prisma.task.update({
            where: { id },
            data: {
                ...(data.title !== undefined && { title: data.title }),
                ...(data.description !== undefined && { description: data.description }),
                ...(data.status !== undefined && { status: data.status }),
                ...(data.priority !== undefined && { priority: data.priority })
            }
        })

        return task
    } catch (err: any) {
        throw new Error('Failed to update task', { cause: err })
    }
    }

    async deleteTask(id: string){
         const findTask = await prisma.task.findUnique({
            where: { id },
        })

        if(!findTask) {
            throw new Error('Task not found')
        }

        try {
            await prisma.task.delete({
                where: { id }
            })

            return { message: 'Success by deleting task' }
        } catch (err: any) {
            throw new Error('Failed to delete task', { cause: err })
        }
    }
}

export const taskService = new TaskService()
