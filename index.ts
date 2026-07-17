import Fastify from 'fastify'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { TaskRoutes } from './src/models/Task/task.routes'

const fastify = Fastify()

fastify.get('/', (_request: FastifyRequest, reply: FastifyReply) => {
    return reply.send({status: 'ok', message: 'Server Working'})
})

fastify.register(TaskRoutes)

fastify.listen({ port: 3333 })