import { z } from 'zod'

export const TaskCreateSchema = z.object({
    title: z.string().max(30),
    description: z.string().max(40),
    status: z.enum(['active', 'inactive']),
    priority: z.string().max(50),
})

export const TaskUpdateSchema = z.object({
    title: z.string().max(30).optional(),
    description: z.string().max(40).optional(),
    status: z.enum(['active', 'inactive']).optional(),
    priority: z.string().max(50).optional(),
})

export type TaskCreateSchema = z.infer<typeof TaskCreateSchema>
export type TaskUpdateSchema = z.infer<typeof TaskUpdateSchema>
