import { z } from 'zod'

export const UserCreateSchema = z.object({
    name: z.string().max(30),
    email: z.email(),
    age: z.number(),
})

export const UserUpdateSchema = z.object({
    name: z.string().max(30).optional(),
    email: z.email().optional(),
    age: z.number().optional(),
})

export type UserCreateSchema = z.infer<typeof UserCreateSchema>
export type UserUpdateSchema = z.infer<typeof UserUpdateSchema>