import type { FastifyInstance } from "fastify";
import { userController } from "./user.controller";

export async function UserRoutes(app: FastifyInstance){
    app.post('/user', (request, reply) => {
        return userController.createUser(request, reply)
    })

    app.get('/user/:id', (request, reply) => {
        return userController.getUserByID(request, reply)
    })

    app.put('/user/:id', (request, reply) => {
        return userController.updateUser(request, reply)
    })

    app.delete('/user/:id', (request, reply) => {
        return userController.deleteUser(request, reply)
    })
}