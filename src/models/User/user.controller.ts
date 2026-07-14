import type { FastifyRequest, FastifyReply } from 'fastify'
import { userService } from './user.service'
import { UserCreateSchema, UserUpdateSchema } from './user.schema'

class UserController {
    async createUser(request: FastifyRequest, reply: FastifyReply) {
        const data = UserCreateSchema.parse(request.body)

        const user = await userService.createUser(data)

        return reply.status(200).send({
            message: 'Success',
            success: true,
            data: user
        })
    }

    async getUserByID(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string }

        const user = await userService.getUserByID(id)

        return reply.status(200).send({
            message: 'Success',
            success: true,
            data: user
        })
    }

    async updateUser(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string }
        const data = UserUpdateSchema.parse(request.body)

        const user = await userService.updateUser(id, data)

        return reply.status(200).send({
            message: 'Success',
            success: true,
            data: user
        })
    }

    async deleteUser(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as {id: string}

        await userService.deleteUser(id)

        return reply.status(200).send({
            message: 'Success',
            success: true,
        })
    }
}

export const userController = new UserController()