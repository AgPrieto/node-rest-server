import { create } from "domain";
import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Buy Milk", createdAt: new Date() },
  { id: 2, text: "Pay Taxes", createdAt: null },
  { id: 3, text: "Wash the car", createdAt: new Date() },
];

export class TodosController {
  //*DI
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  public getTodosById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });

    const todo = todos.find((todo) => todo.id === id);

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `TODO with id ${id} not found` });
  };

  public createTodos = (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text)
      return res.status(400).json({ error: "Text property is required" });

    const newTodo = {
      id: todos.length + 1,
      text: text,
      createdAt: null,
    };
    todos.push(newTodo);

    res.json(newTodo);
  };

  public updateTodos = (req: Request, res: Response) => {
    const id = +req.params.id;
    const { text, createdAt } = req.body;

    if (isNaN(id))
      return res.status(400).json({ error: "ID must be a number" });

    const todo = todos.find((t) => t.id === id);
    if (!todo)
      return res.status(404).json({ error: `TODO with id ${id} not found` });

    todo.text = text || todo.text;
    createdAt === "null"
      ? (todo.createdAt = null)
      : (todo.createdAt = new Date(createdAt || todo.createdAt));

    res.json(todo);
  };

  public deleteTodos = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id))
      return res.status(400).json({ error: "ID must be a number" });

    const todoIndex = todos.findIndex((t) => t.id === id);
    if (todoIndex === -1)
      return res.status(404).json({ error: `TODO with id ${id} not found` });

    const deletedTodo = todos.splice(todoIndex, 1)[0];

    return res.json({
      message: `TODO with id ${id} deleted`,
      todo: deletedTodo,
    });
  };
}
