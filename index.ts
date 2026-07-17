import Fastify from 'fastify'
import type { FastifyReply, FastifyRequest } from 'fastify'
import {
    serializerCompiler,
    validatorCompiler,
    jsonSchemaTransform,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { TaskRoutes } from './src/models/Task/task.routes'

const fastify = Fastify().withTypeProvider<ZodTypeProvider>()

fastify.setValidatorCompiler(validatorCompiler)
fastify.setSerializerCompiler(serializerCompiler)

async function main() {
    await fastify.register(fastifySwagger, {
        openapi: {
            info: { title: 'Task API', version: '1.0.0' },
        },
        transform: jsonSchemaTransform,
    })

    await fastify.register(fastifySwaggerUi, {
        routePrefix: '/docs',
    })

    fastify.get('/', (_request: FastifyRequest, reply: FastifyReply) => {
        return reply.send({ status: 'ok', message: 'Server Working' })
    })

    fastify.register(TaskRoutes)

    await fastify.listen({ port: 3333 })
}

main()
