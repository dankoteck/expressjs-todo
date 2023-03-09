import { Prisma } from "@prisma/client";
import prisma from "src/db";

export default class TodoService {
  async getAll(currentUser: Prisma.UserWhereUniqueInput) {
    try {
      const { email } = currentUser;
      const todoSelect: Prisma.TodoSelect = {
        id: true,
        title: true,
      };
      const userSelect: Prisma.UserSelect = {
        todos: { select: todoSelect },
      };

      const todos = await prisma.user.findUnique({
        where: { email },
        select: userSelect,
      });
      return todos;
    } catch (err) {
      throw err;
    }
  }

  async getOne(id: number, queryParams?: Prisma.TodoWhereInput) {
    const where: Prisma.TodoWhereInput = {
      id,
      ...(queryParams ? queryParams : {}),
    };
    try {
      const todo = await prisma.todo.findFirst({ where });
      return todo;
    } catch (err) {
      throw err;
    }
  }

  async create(email: string, { title, description }: Prisma.TodoCreateInput) {
    try {
      const todo = await prisma.todo.create({
        data: {
          title,
          description,
          ownerEmail: email,
          completed: false,
        },
      });
      return todo;
    } catch (err) {
      throw err;
    }
  }

  async update(email: string, id: number, payload: Prisma.TodoUpdateInput) {
    try {
      const userTodo = await this.getOne(id, { ownerEmail: email });

      if (!userTodo) {
        throw `Todo not found with ID: ${id}`;
      }

      await prisma.todo.update({ where: { id }, data: payload });
    } catch (err) {
      throw err;
    }
  }

  async delete(email: string, id: number) {
    try {
      const userTodo = await this.getOne(id, { ownerEmail: email });

      if (!userTodo) {
        throw `Todo not found with ID: ${id}`;
      }

      await prisma.todo.delete({ where: { id } });
    } catch (err) {
      throw err;
    }
  }
}
