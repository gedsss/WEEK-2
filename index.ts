import Fastify from 'fastify'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserRoutes } from './src/models/User/user.routes'

const fastify = Fastify()

fastify.get('/', (_request: FastifyRequest, reply: FastifyReply) => {
    return reply.send({status: 'ok', message: 'Server Working'})
})

fastify.register(UserRoutes)

fastify.listen({ port: 3333 })