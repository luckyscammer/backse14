import db from "@config";

const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
  `;

  try {
    await db.query(query);
  } catch (error) {
    console.error("❌ Error creating 'users' table:", error);
  }
};

export default createUsersTable;
