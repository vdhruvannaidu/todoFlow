import { Request, Response } from 'express';
import prisma from '../db';
import { createTodoSchema, updateTodoSchema } from '../schemas/zod.schemas';

export const createTodo = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const parsed = createTodoSchema.safeParse(req.body);
  if(!parsed.success) return res.status(400).json({ errors: parsed.error.flatten() });

  const todo = await prisma.todo.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      userId
    }
  });

  res.status(201).json(todo);
};

export const listTodos = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const todos = await prisma.todo.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }});
  res.json(todos);
};

export const getTodo = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const id = req.params.id;
  const todo = await prisma.todo.findFirst({ where: { id, userId }});
  if(!todo) return res.status(404).json({ message: 'Not found' });
  res.json(todo);
};

export const updateTodo = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const id = req.params.id;
  const parsed = updateTodoSchema.safeParse(req.body);
  if(!parsed.success) return res.status(400).json({ errors: parsed.error.flatten() });

  const todo = await prisma.todo.findFirst({ where: { id, userId }});
  if(!todo) return res.status(404).json({ message: 'Not found' });

  const updated = await prisma.todo.update({
    where: { id },
    data: parsed.data
  });

  res.json(updated);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const id = req.params.id;
  const todo = await prisma.todo.findFirst({ where: { id, userId }});
  if(!todo) return res.status(404).json({ message: 'Not found' });

  await prisma.todo.delete({ where: { id }});
  res.status(204).send();
};
