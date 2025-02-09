import db from "@config";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

export const getUsers = async (): Promise<User[]> => {
  const result = await db.query("SELECT * FROM users");
  return result.rows as User[];
};


export const getUserByEmail = async (email: string): Promise<User> => {
  const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0] as User;
};

export const getUserById = async (id: number) => {
  const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

export const createUser = async (values: { name: string; email: string; password: string }) => {
  const { name, email, password } = values;
  const result = await db.query(
    "INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
    [name, email, password]
  );
  return result.rows[0];
};

export const deleteUserById = async (id: number): Promise<User | null> => {
  const result = await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
  return result.rows[0] as User | null;
};

export const updateUserById = async (id: number, values: Partial<User>) => {
  const keys = Object.keys(values);
  const valuesArray = Object.values(values);

  if (keys.length === 0) return null;

  const setString = keys.map((key, index) => `${key} = $${index + 2}`).join(", ");

  const result = await db.query(
    `UPDATE users SET ${setString} WHERE id = $1 RETURNING *`,
    [id, ...valuesArray]
  );

  return result.rows[0];
};
