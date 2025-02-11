import db from "@config";
import { ProjectMemberModel } from "./projectMember.model";

export type TaskStatus = "new" | "in_progress" | "done";

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  project_id: number;
  assignee_id?: number | null;
  created_at: Date;
  deadline?: Date | null;
}

export class TaskModel {
  static async create(
    title: string,
    project_id: number,
    assignee_id?: number | null,
    description?: string,
    deadline?: Date
  ): Promise<Task> {
    if (assignee_id) {
      const isMember = await ProjectMemberModel.isMember(project_id, assignee_id);
      if (!isMember) {
        throw new Error("User is not a member of this project");
      }
    }

    const result = await db.query(
      "INSERT INTO tasks (title, description, status, project_id, assignee_id, deadline, created_at) VALUES ($1, $2, 'new', $3, $4, $5, NOW()) RETURNING *",
      [title, description || null, project_id, assignee_id || null, deadline || null]
    );
    return result.rows[0] as Task;
  }

  static async getById(id: number): Promise<Task | null> {
    const result = await db.query("SELECT * FROM tasks WHERE id = $1", [id]);
    return result.rows[0] as Task || null;
  }


  static async getAllByProject(project_id: number): Promise<Task[]> {
    const result = await db.query("SELECT * FROM tasks WHERE project_id = $1", [project_id]);
    return result.rows as Task[];
  }

  static async update(id: number, values: Partial<Task>): Promise<Task | null> {
    const keys = Object.keys(values);
    const valuesArray = Object.values(values);

    if (keys.length === 0) return null;

    const setString = keys.map((key, index) => `${key} = $${index + 2}`).join(", ");

    const result = await db.query(
      `UPDATE tasks SET ${setString} WHERE id = $1 RETURNING *`,
      [id, ...valuesArray]
    );

    return result.rows[0] as Task || null;
  }

  static async delete(id: number): Promise<Task | null> {
    const result = await db.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [id]);
    return result.rows[0] as Task || null;
  }
}
