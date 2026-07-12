import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z
    .string()
    .transform((value) => value.trim())
    .pipe(z.string().min(1, 'Title is required')),
})

export const updateTaskSchema = z
  .object({
    title: z
      .string()
      .transform((value) => value.trim())
      .pipe(z.string().min(1, 'Title is required'))
      .optional(),
    isDone: z.boolean().optional(),
  })
  .refine((data) => data.title !== undefined || data.isDone !== undefined, {
    message: 'At least one field is required',
  })
