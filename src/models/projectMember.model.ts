import db from "@config";

export type ProjectMemberRole = "member" | "admin";

export interface ProjectMember {
  id: number;
  project_id: number;
  user_id: number;
  role: ProjectMemberRole;
}

export class ProjectMemberModel {
  static async addMember(project_id: number, user_id: number, role: ProjectMemberRole = "member"): Promise<ProjectMember> {
    const result = await db.query(
      "INSERT INTO project_members (project_id, user_id, role) VALUES ($1, $2, $3) RETURNING *",
      [project_id, user_id, role]
    );
    return result.rows[0] as ProjectMember;
  }

  static async removeMember(project_id: number, user_id: number): Promise<ProjectMember | null> {
    const result = await db.query(
      "DELETE FROM project_members WHERE project_id = $1 AND user_id = $2 RETURNING *",
      [project_id, user_id]
    );
    return result.rows[0] as ProjectMember || null;
  }

  static async getMembers(project_id: number): Promise<ProjectMember[]> {
    const result = await db.query(
      "SELECT * FROM project_members WHERE project_id = $1",
      [project_id]
    );
    return result.rows as ProjectMember[];
  }

  static async isMember(project_id: number, user_id: number): Promise<boolean> {
    const result = await db.query(
      "SELECT * FROM project_members WHERE project_id = $1 AND user_id = $2",
      [project_id, user_id]
    );
    return result.rows.length > 0;
  }
}
