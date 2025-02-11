import { handleError } from "@middlewares";
import { Request, Response } from "express";
import { ProjectModel, User, UserModel } from "@models";

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const { email } = req.query;

      if (email) {
        if (typeof email !== "string") {
          return res.status(400).json({ message: "Email must be a string" });
        }

        const user = await UserModel.getByEmail(email);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        return res.json(user);
      }

      const users = await UserModel.getAll();
      res.json(users);
    } catch (error) {
      handleError(res, error);
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const user = await UserModel.getById(Number(id));

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      handleError(res, error);
    }
  }

  static async createNewUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields (name, email, password) are required" });
      }

      const newUser: User = await UserModel.create({ name, email, password });
      res.status(201).json(newUser);
    } catch (error) {
      handleError(res, error);
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const deletedUser = await UserModel.deleteById(Number(id));

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
      handleError(res, error);
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      if (!id) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const existingUser = await UserModel.getById(Number(id));
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const updatedData: Partial<User> = {};
      if (name) updatedData.name = name;
      if (email) updatedData.email = email;
      if (password) updatedData.password = password;

      if (Object.keys(updatedData).length === 0) {
        return res.status(400).json({ message: "No fields to update" });
      }

      const updatedUser = await UserModel.updateById(Number(id), updatedData);
      res.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      handleError(res, error);
    }
  }

  static async createProjectForUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      if (!name) {
        return res.status(400).json({ message: "Project name is required" });
      }

      const user = await UserModel.getById(Number(id));
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const newProject = await ProjectModel.create(name, Number(id), description);
      res.status(201).json(newProject);
    } catch (error) {
      handleError(res, error);
    }
  }
}
