import Fastify from 'fastify'
import type { FastifyReply, FastifyRequest } from 'fastify'

const fastify = Fastify()

fastify.get('/', (_request: FastifyRequest, reply: FastifyReply) => {
    return reply.send({status: 'ok', message: 'Server Working'})
})

fastify.listen({ port: 3333 })