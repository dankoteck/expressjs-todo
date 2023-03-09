import { Response } from "express";
import { UserDTO, UserRequest } from "src/types";
import { createResponse200, createResponse500 } from "src/utils";
import TodoService from "./service";

export default class TodoController {
  private todoService = new TodoService();

  async getAll(req: UserRequest, res: Response) {
    try {
      const todos = await this.todoService.getAll(req.user as UserDTO);
      res.status(200).json(createResponse200(todos));
    } catch (err) {
      res.status(500).json(createResponse500(err));
    }
  }

  async getOne(req: UserRequest, res: Response) {
    try {
      const { id } = req.params;
      const todo = await this.todoService.getOne(Number(id));
      res.status(200).json(createResponse200(todo));
    } catch (err) {
      res.status(500).json(createResponse500(err));
    }
  }

  async create(req: UserRequest, res: Response) {
    const { title, description } = req.body;
    const { user } = req;
    const { email } = user as UserDTO;

    try {
      const todo = await this.todoService.create(email, { title, description });
      res.status(200).json(createResponse200(todo));
    } catch (err) {
      res.status(500).json(createResponse500(err, "Cannot created."));
    }
  }

  async update(req: UserRequest, res: Response) {
    const { user } = req;
    const { email } = user as UserDTO;
    const { id } = req.params;

    try {
      await this.todoService.update(email, +id, req.body);
      res.status(200).json(createResponse200(null, "Updated success."));
    } catch (err) {
      res.status(500).json(createResponse500(err, "Cannot updated."));
    }
  }

  async delete(req: UserRequest, res: Response) {
    const { user } = req;
    const { email } = user as UserDTO;
    const { id } = req.params;

    try {
      await this.todoService.delete(email, +id);
      res.status(200).json(createResponse200(null, "Delete success."));
    } catch (err) {
      res.status(500).json(createResponse500(err, "Cannot delete."));
    }
  }
}
