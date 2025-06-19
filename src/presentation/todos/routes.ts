import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDatasourceImplementation } from "../../infraestructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infraestructure/repositories/todo.repository.impl";


export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const todoDatasource = new TodoDatasourceImplementation();
    const todoRepository = new TodoRepositoryImpl(todoDatasource);
    const todoController = new TodosController(todoRepository)

    router.get("/", todoController.getTodos);
    router.get("/:id", todoController.getTodosById);
    router.post("/", todoController.createTodos);
    router.put("/:id", todoController.updateTodos);
    router.delete("/:id", todoController.deleteTodos);

    return router;
  }
}