import { Router } from "express";
import { isLoggedIn } from "src/middlewares";
import TodoController from "./controller";

const router = new (Router as any)();

const todoController = new TodoController();

router.get("/", isLoggedIn, todoController.getAll.bind(todoController));

router.get("/:id", isLoggedIn, todoController.getOne.bind(todoController));

router.post("/", isLoggedIn, todoController.create.bind(todoController));

router.put("/:id", isLoggedIn, todoController.update.bind(todoController));

router.delete("/:id", isLoggedIn, todoController.delete.bind(todoController));

export default router;
