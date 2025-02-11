import { handleError } from "@middlewares";
import { Request, Response } from "express";
import { ProjectModel } from "@models";

export class ProjectController {
  static async getAll(req: Request, res: Response) {
    try {
      const projects = await ProjectModel.getAll();
      res.json(projects);
    } catch (error) {
      handleError(res, error);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const project = await ProjectModel.getById(Number(id));

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.json(project);
    } catch (error) {
      handleError(res, error);
    }
  }

  static async getByOwner(req: Request, res: Response) {
    try {
      const { owner_id } = req.params;
      const projects = await ProjectModel.getByOwner(Number(owner_id));
      res.json(projects);
    } catch (error) {
      handleError(res, error);
    }
  }

  static async updateById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const values = req.body;

      if (!values || Object.keys(values).length === 0) {
        return res.status(400).json({ message: "No values provided for update" });
      }

      const updatedProject = await ProjectModel.updateById(Number(id), values);

      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.json(updatedProject);
    } catch (error) {
      handleError(res, error);
    }
  }

  static async deleteById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedProject = await ProjectModel.deleteById(Number(id));

      if (!deletedProject) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.json({ message: "Project deleted", project: deletedProject });
    } catch (error) {
      handleError(res, error);
    }
  }
}
