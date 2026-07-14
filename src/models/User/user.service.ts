import  type { UserCreateSchema, UserUpdateSchema } from "./user.schema";
import { prisma } from "../../../prisma/prismaClient"; 

class UserService {
    async createUser(data: UserCreateSchema){
        if(!data || Object.keys(data).length === 0){
            throw new Error("User data is required");
        }

        if(!data.age || !data.email || !data.name) {
            throw new Error("Missing Data")
        }
        try {
        const user = await prisma.user.create({
            data: {
                name: data.name,
                age: data.age,
                email: data.email
            }
        })

        return user
        } catch (err: any) {
            throw new Error('User creation failed', { cause: err })
        }
    }

    async getUserByID(id: string) {
        const user = await prisma.user.findUnique({
            where: { id }, 
        })

        if(!user) {
            throw new Error('User not found')
        }

        return user
    }

    async updateUser(id: string, data: UserUpdateSchema) {
        const findUser = await prisma.user.findUnique({
            where: { id }, 
        })

        if(!findUser) {
            throw new Error('User not found')
        }
        try {
        const user = await prisma.user.update({
            where: { id },
            data: {
                ...(data.name !== undefined && { name: data.name }),
                ...(data.age !== undefined && { age: data.age }),
                ...(data.email !== undefined && { email: data.email })
            }
        })

        return user
    } catch (err: any) {
        throw new Error('Failed to update user', { cause: err })
    }
    }

    async deleteUser(id: string){
         const findUser = await prisma.user.findUnique({
            where: { id }, 
        })

        if(!findUser) {
            throw new Error('User not found')
        }

        try {
            await prisma.user.delete({
                where: { id }
            })

            return { message: 'Success by deleting user' }
        } catch (err: any) {
            throw new Error('Failed to delete user', { cause: err })
        }
    }
}

export const userService = new UserService()