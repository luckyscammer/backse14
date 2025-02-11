import db from "@config";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

export class UserModel {
  static async getAll(): Promise<User[]> {
    const result = await db.query("SELECT * FROM users");
    return result.rows as User[];
  }

  static async getByEmail(email: string): Promise<User | null> {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0] as User || null;
  }

  static async getById(id: number): Promise<User | null> {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0] as User || null;
  }

  static async create(values: { name: string; email: string; password: string }): Promise<User> {
    const { name, email, password } = values;
    const result = await db.query(
      "INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
      [name, email, password]
    );
    return result.rows[0] as User;
  }

  static async deleteById(id: number): Promise<User | null> {
    const result = await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    return result.rows[0] as User || null;
  }

  static async updateById(id: number, values: Partial<User>): Promise<User | null> {
    const keys = Object.keys(values);
    const valuesArray = Object.values(values);

    if (keys.length === 0) return null;

    const setString = keys.map((key, index) => `${key} = $${index + 2}`).join(", ");

    const result = await db.query(
      `UPDATE users SET ${setString} WHERE id = $1 RETURNING *`,
      [id, ...valuesArray]
    );

    return result.rows[0] as User || null;
  }
}
