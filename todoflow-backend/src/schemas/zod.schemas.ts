import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const createTodoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional()
});

export const updateTodoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean().optional()
});
