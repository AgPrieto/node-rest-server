
import { Request, Response } from "express";
import { prisma } from "../../data/postgresql";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodosController {
  //*DI
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    try {
      const todos = await prisma.todo.findMany();
      return res.json(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  public getTodosById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });
    try {
      const todo = await prisma.todo.findUnique({
        where: { id },
      });

      if (!todo) {
        return res.status(404).json({ error: `TODO with id ${id} not found` });
      }

      return res.json(todo);
    } catch (error) {
      console.error("Error fetching TODO by ID:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  public createTodos = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });

    res.json(todo);
  };

  public updateTodos = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    try {
      const existingTodo = await prisma.todo.findUnique({ where: { id } });

      if (!existingTodo) {
        return res.status(404).json({ error: `TODO with id ${id} not found` });
      }

      const updatedTodo = await prisma.todo.update({
        where: { id },
        data:  updateTodoDto!.values,
      });

      return res.json(updatedTodo);
    } catch (error) {
      console.error("Error updating TODO:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  public deleteTodos = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id))
      return res.status(400).json({ error: "ID must be a number" });

    try {
      const existingTodo = await prisma.todo.findUnique({ where: { id } });

      if (!existingTodo) {
        return res.status(404).json({ error: `TODO with id ${id} not found` });
      }

      const deletedTodo = await prisma.todo.delete({ where: { id } });

      return res.json({
        message: `TODO with id ${id} deleted`,
        todo: deletedTodo,
      });
    } catch (error) {
      console.error("Error deleting TODO:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
