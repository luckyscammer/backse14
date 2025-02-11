import db from "@config";

export interface Project {
  id: number;
  name: string;
  description?: string;
  owner_id: number;
  created_at: Date;
}

export class ProjectModel {
  static async getAll(): Promise<Project[]> {
    const result = await db.query("SELECT * FROM projects");
    return result.rows as Project[];
  }

  static async getById(id: number): Promise<Project | null> {
    const result = await db.query("SELECT * FROM projects WHERE id = $1", [id]);
    return result.rows[0] as Project || null;
  }

  static async getByOwner(owner_id: number): Promise<Project[]> {
    const result = await db.query("SELECT * FROM projects WHERE owner_id = $1", [owner_id]);
    return result.rows as Project[];
  }

  static async create(name: string, owner_id: number, description?: string): Promise<Project> {
    const result = await db.query(
      "INSERT INTO projects (name, description, owner_id, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
      [name, description || null, owner_id]
    );
    return result.rows[0] as Project;
  }

  static async updateById(id: number, values: Partial<Project>): Promise<Project | null> {
    const keys = Object.keys(values);
    const valuesArray = Object.values(values);

    if (keys.length === 0) return null;

    const setString = keys.map((key, index) => `${key} = $${index + 2}`).join(", ");

    const result = await db.query(
      `UPDATE projects SET ${setString} WHERE id = $1 RETURNING *`,
      [id, ...valuesArray]
    );

    return result.rows[0] as Project || null;
  }

  static async deleteById(id: number): Promise<Project | null> {
    const result = await db.query("DELETE FROM projects WHERE id = $1 RETURNING *", [id]);
    return result.rows[0] as Project || null;
  }
}
