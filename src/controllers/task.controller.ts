import { Request, Response } from "express";
import { TaskModel } from "@models";
import { handleError } from "@middlewares";

export class TaskController {
  static async create(req: Request, res: Response) {
    try {
      const { title, description, project_id, assignee_id, deadline } = req.body;

      if (!title || !project_id) {
        return res.status(400).json({ message: "Title and project_id are required" });
      }

      const newTask = await TaskModel.create(title, Number(project_id), assignee_id ? Number(assignee_id) : undefined, description, deadline);
      res.status(201).json(newTask);
    } catch (error) {
      handleError(res, error);
    }
  }

  static async getAllByProject(req: Request, res: Response) {
    try {
      const { project_id } = req.params;
      const tasks = await TaskModel.getAllByProject(Number(project_id));
      res.json(tasks);
    } catch (error) {
      handleError(res, error);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const values = req.body;

      if (Object.keys(values).length === 0) {
        return res.status(400).json({ message: "No values provided for update" });
      }

      const updatedTask = await TaskModel.update(Number(id), values);

      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.json(updatedTask);
    } catch (error) {
      handleError(res, error);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedTask = await TaskModel.delete(Number(id));

      if (!deletedTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.json({ message: "Task deleted successfully", task: deletedTask });
    } catch (error) {
      handleError(res, error);
    }
  }
}
