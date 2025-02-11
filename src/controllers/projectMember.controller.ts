import { Request, Response } from "express";
import { ProjectMemberModel } from "@models";
import { handleError } from "@middlewares";

export class ProjectMemberController {
  static async addMember(req: Request, res: Response) {
    try {
      const { project_id, user_id, role } = req.body;

      if (!project_id || !user_id) {
        return res.status(400).json({ message: "Project ID and User ID are required" });
      }

      const newMember = await ProjectMemberModel.addMember(Number(project_id), Number(user_id), role);
      res.status(201).json(newMember);
    } catch (error) {
      handleError(res, error);
    }
  }

  static async removeMember(req: Request, res: Response) {
    try {
      const { project_id, user_id } = req.body;

      if (!project_id || !user_id) {
        return res.status(400).json({ message: "Project ID and User ID are required" });
      }

      const removedMember = await ProjectMemberModel.removeMember(Number(project_id), Number(user_id));

      if (!removedMember) {
        return res.status(404).json({ message: "Member not found in project" });
      }

      res.json({ message: "Member removed successfully", member: removedMember });
    } catch (error) {
      handleError(res, error);
    }
  }

  static async getMembers(req: Request, res: Response) {
    try {
      const { project_id } = req.params;

      if (!project_id) {
        return res.status(400).json({ message: "Project ID is required" });
      }

      const members = await ProjectMemberModel.getMembers(Number(project_id));
      res.json(members);
    } catch (error) {
      handleError(res, error);
    }
  }
}
