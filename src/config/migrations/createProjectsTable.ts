import db from "@config";

const createProjectsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  try {
    await db.query(query);
  } catch (error) {
    console.error("❌ Error creating 'projects' table:", error);
  }
};

export default createProjectsTable;
